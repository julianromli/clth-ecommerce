import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const productCategoryEnum = pgEnum("product_category", [
  "tees",
  "hoodies",
  "jackets",
  "accessories",
]);

export const productStatusEnum = pgEnum("product_status", ["draft", "active", "archived"]);

export const productStockStatusEnum = pgEnum("product_stock_status", [
  "in_stock",
  "out_of_stock",
  "low_stock",
]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  category: productCategoryEnum("category").notNull(),
  price: integer("price").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  colors: jsonb("colors").$type<string[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  stockStatus: productStockStatusEnum("stock_status").notNull().default("in_stock"),
  stockQuantity: integer("stock_quantity").notNull().default(100),
  status: productStatusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type ProductCategory = (typeof productCategoryEnum.enumValues)[number];
export type ProductStatus = (typeof productStatusEnum.enumValues)[number];
export type ProductStockStatus = (typeof productStockStatusEnum.enumValues)[number];
