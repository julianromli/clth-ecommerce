import type { Product } from "@/types/product";
import { Button } from "@CLTH/ui/components/button";
import { Input } from "@CLTH/ui/components/input";
import { Label } from "@CLTH/ui/components/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { ProductImageField } from "@/components/admin/product-image-field";
import { useTRPC } from "@/utils/trpc";

type ProductFormProps = {
  mode: "create" | "edit";
  product?: Product;
};

const categories = [
  { value: "tees", label: "Tees" },
  { value: "hoodies", label: "Hoodies" },
  { value: "jackets", label: "Jackets" },
  { value: "accessories", label: "Accessories" },
] as const;

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const navigate = useNavigate();
  const trpc = useTRPC();

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(product?.slug));
  const [category, setCategory] = useState(product?.category ?? "tees");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [imageUrl, setImageUrl] = useState(product?.images?.[0] ?? "");
  const [colorsText, setColorsText] = useState(product?.colors?.join(", ") ?? "");
  const [status, setStatus] = useState(product?.status ?? "draft");

  const createMutation = useMutation(
    trpc.products.create.mutationOptions({
      onSuccess: () => {
        toast.success("Product created");
        navigate({ to: "/admin/product" });
      },
      onError: (error) => toast.error(error.message),
    }),
  );

  const updateMutation = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: () => {
        toast.success("Product updated");
        navigate({ to: "/admin/product" });
      },
      onError: (error) => toast.error(error.message),
    }),
  );

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEdited) {
      setSlug(slugify(value));
    }
  };

  const buildPayload = () => {
    const parsedPrice = Number.parseInt(price, 10);
    const colors = colorsText
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean);
    const images = imageUrl.trim() ? [imageUrl.trim()] : [];

    if (!name.trim()) {
      throw new Error("Name is required");
    }

    if (!slug.trim()) {
      throw new Error("Slug is required");
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      throw new Error("Price must be a positive number");
    }

    if (images.length === 0) {
      throw new Error("An image URL or upload is required");
    }

    return {
      name: name.trim(),
      slug: slug.trim(),
      category,
      price: parsedPrice,
      images,
      colors,
      status,
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const payload = buildPayload();

      if (mode === "create") {
        createMutation.mutate(payload);
      } else if (product) {
        updateMutation.mutate({ id: product.id, ...payload });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid form data");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => handleNameChange(event.target.value)}
          placeholder="CLTH Classic Tee"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(event) => {
            setSlugEdited(true);
            setSlug(event.target.value);
          }}
          placeholder="classic-tee"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as Product["category"])
            }
            className="flex h-8 w-full rounded-none border border-input bg-background px-2.5 text-sm"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as Product["status"])
            }
            className="flex h-8 w-full rounded-none border border-input bg-background px-2.5 text-sm"
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (IDR)</Label>
        <Input
          id="price"
          type="number"
          min={1}
          step={1}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="590000"
          required
        />
      </div>

      <ProductImageField imageUrl={imageUrl} onImageUrlChange={setImageUrl} />

      <div className="space-y-2">
        <Label htmlFor="colors">Colors (comma-separated hex)</Label>
        <Input
          id="colors"
          value={colorsText}
          onChange={(event) => setColorsText(event.target.value)}
          placeholder="#4A5D4E, #F2F1EC, #2B2B2B"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {mode === "create" ? "Create product" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: "/admin/product" })}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
