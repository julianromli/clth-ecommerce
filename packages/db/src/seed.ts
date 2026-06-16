import { config } from "dotenv";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

config({ path: resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../apps/web/.env") });

const { db } = await import("./index");
const { products } = await import("./schema/product");

const seedProducts = [
  {
    slug: "classic-tee",
    name: "CLTH Classic Tee",
    category: "tees" as const,
    price: 590000,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    ],
    colors: ["#4A5D4E", "#F2F1EC", "#2B2B2B"],
    status: "active" as const,
    stockStatus: "in_stock" as const,
    stockQuantity: 100,
  },
  {
    slug: "coastal-hoodie",
    name: "Coastal Hoodie",
    category: "hoodies" as const,
    price: 1190000,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1965&auto=format&fit=crop",
    ],
    colors: ["#DED8CF", "#4A5D4E", "#E4A562"],
    status: "active" as const,
    stockStatus: "in_stock" as const,
    stockQuantity: 100,
  },
  {
    slug: "wanderer-jacket",
    name: "Wanderer Jacket",
    category: "jackets" as const,
    price: 1950000,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    ],
    colors: ["#2B2B2B", "#1E293B", "#F8FAFC"],
    status: "active" as const,
    stockStatus: "in_stock" as const,
    stockQuantity: 100,
  },
  {
    slug: "explorer-backpack",
    name: "Explorer Backpack",
    category: "accessories" as const,
    price: 1350000,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    ],
    colors: ["#767A60", "#A99B83", "#2B2B2B"],
    status: "active" as const,
    stockStatus: "in_stock" as const,
    stockQuantity: 100,
  },
];

async function seed() {
  for (const product of seedProducts) {
    await db
      .insert(products)
      .values(product)
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: product.name,
          category: product.category,
          price: product.price,
          images: product.images,
          colors: product.colors,
          status: product.status,
          stockStatus: product.stockStatus,
          stockQuantity: product.stockQuantity,
          updatedAt: new Date(),
        },
      });
  }

  console.log(`Seeded ${seedProducts.length} products`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
