import { db } from "@CLTH/db";
import { products } from "@CLTH/db/schema/product";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

const categorySchema = z.enum(["tees", "hoodies", "jackets", "accessories"]);
const statusSchema = z.enum(["draft", "active", "archived"]);

const productWriteSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  category: categorySchema,
  price: z.number().int().positive(),
  images: z.array(z.url()).min(1),
  colors: z.array(z.string()).default([]),
  status: statusSchema,
});

export const productsRouter = router({
  listActive: publicProcedure
    .input(
      z
        .object({
          limit: z.number().int().positive().max(50).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? 20;

      return db
        .select()
        .from(products)
        .where(
          and(eq(products.status, "active"), eq(products.stockStatus, "in_stock")),
        )
        .orderBy(desc(products.updatedAt))
        .limit(limit);
    }),

  list: adminProcedure
    .input(
      z
        .object({
          status: statusSchema.optional(),
          category: categorySchema.optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const conditions = [];

      if (input?.status) {
        conditions.push(eq(products.status, input.status));
      }

      if (input?.category) {
        conditions.push(eq(products.category, input.category));
      }

      if (conditions.length === 0) {
        return db.select().from(products).orderBy(desc(products.updatedAt));
      }

      return db
        .select()
        .from(products)
        .where(and(...conditions))
        .orderBy(desc(products.updatedAt));
    }),

  getById: adminProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ input }) => {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, input.id))
        .limit(1);

      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
      }

      return product;
    }),

  stats: adminProcedure.query(async () => {
    const [total] = await db.select({ value: count() }).from(products);
    const [active] = await db
      .select({ value: count() })
      .from(products)
      .where(eq(products.status, "active"));
    const [draft] = await db
      .select({ value: count() })
      .from(products)
      .where(eq(products.status, "draft"));
    const [archived] = await db
      .select({ value: count() })
      .from(products)
      .where(eq(products.status, "archived"));
    const [outOfStock] = await db
      .select({ value: count() })
      .from(products)
      .where(eq(products.stockStatus, "out_of_stock"));

    return {
      total: total.value,
      active: active.value,
      draft: draft.value,
      archived: archived.value,
      outOfStock: outOfStock.value,
    };
  }),

  recent: adminProcedure.query(async () => {
    return db.select().from(products).orderBy(desc(products.updatedAt)).limit(5);
  }),

  create: adminProcedure.input(productWriteSchema).mutation(async ({ input }) => {
    const [product] = await db
      .insert(products)
      .values({
        name: input.name,
        slug: input.slug,
        category: input.category,
        price: input.price,
        images: input.images,
        colors: input.colors,
        status: input.status,
      })
      .returning();

    return product;
  }),

  update: adminProcedure
    .input(
      productWriteSchema.extend({
        id: z.uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const [product] = await db
        .update(products)
        .set({
          name: input.name,
          slug: input.slug,
          category: input.category,
          price: input.price,
          images: input.images,
          colors: input.colors,
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(products.id, input.id))
        .returning();

      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
      }

      return product;
    }),

  archive: adminProcedure
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ input }) => {
      const [product] = await db
        .update(products)
        .set({ status: "archived", updatedAt: new Date() })
        .where(eq(products.id, input.id))
        .returning();

      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
      }

      return product;
    }),
});
