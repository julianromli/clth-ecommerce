import { verifyAdminSessionFromRequest } from "@CLTH/api/admin-session";
import { createUploadthing, type FileRouter, UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  productImage: f(
    { image: { maxFileSize: "4MB", maxFileCount: 1 } },
    { awaitServerData: false },
  )
    .middleware(async ({ req }) => {
      if (!verifyAdminSessionFromRequest(req)) {
        throw new UploadThingError("Unauthorized");
      }

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
