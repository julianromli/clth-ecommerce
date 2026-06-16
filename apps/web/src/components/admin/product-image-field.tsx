import { Button } from "@CLTH/ui/components/button";
import { Input } from "@CLTH/ui/components/input";
import { Label } from "@CLTH/ui/components/label";
import { ImageIcon, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useUploadThing } from "@/utils/uploadthing";

function resolveUploadedImageUrl(
  file:
    | {
        url?: string;
        ufsUrl?: string;
        serverData?: { url?: string } | null;
      }
    | undefined,
) {
  if (!file) return undefined;
  return file.ufsUrl ?? file.url ?? file.serverData?.url;
}

type ProductImageFieldProps = {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
};

export function ProductImageField({ imageUrl, onImageUrlChange }: ProductImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload, isUploading } = useUploadThing("productImage", {
    onUploadProgress: (progress) => setUploadProgress(progress),
    onUploadError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setUploadProgress(0);

    try {
      const result = await startUpload(Array.from(files));
      if (!result?.length) return;

      const url = resolveUploadedImageUrl(result[0]);
      if (url) {
        onImageUrlChange(url);
        toast.success("Image uploaded");
      } else {
        toast.error("Upload finished but no image URL was returned");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      toast.error(message);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <Label>Product image</Label>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:w-40"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Product preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon size={24} strokeWidth={1.5} />
                <span className="text-xs text-gray-500">No image yet</span>
              </div>
            )}

            {isUploading ? (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-100">
                <div
                  className="h-full origin-left bg-gray-900 transition-transform duration-200 ease-out"
                  style={{ transform: `scaleX(${uploadProgress / 100})` }}
                />
              </div>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Upload from your device</p>
              <p className="mt-0.5 text-xs text-gray-500">JPG, PNG, or WebP · max 4MB</p>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading}
              onChange={handleFileChange}
            />

            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
              className="w-full gap-2 transition-transform duration-[160ms] ease-out active:scale-[0.97] sm:w-auto"
            >
              <Upload size={14} strokeWidth={2} />
              {isUploading ? `Uploading… ${uploadProgress}%` : "Choose file"}
            </Button>
          </div>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs text-gray-500">or paste URL</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-gray-700">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(event) => onImageUrlChange(event.target.value)}
            placeholder="https://images.example.com/product.jpg"
          />
        </div>
      </div>
    </div>
  );
}
