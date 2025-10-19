import React, { useState } from "react";
import { resolveImageUrl } from "../utils/image";
import { convertToWebP } from "../utils/imageUtils";

const BASE_URL = "http://localhost:9494";


export default function ImageUploader({ productCode, category, subCategory, onChange }) {
  const [busy, setBusy] = useState(false);

        const uploadFiles = async (files) => {
        if (!files.length) return;
        setBusy(true);

        try {
          for (const file of files) {
            const webpFile = await convertToWebP(file);

            const form = new FormData();
            form.append("file", webpFile);
            form.append("category", category);
            form.append("subCategory", subCategory);

            const res = await fetch(
              `${BASE_URL}/api/v1/products/${productCode}/images`,
              {
                method: "POST",
                body: form,
              }
            );

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            console.log("📦 server response:", data);

            if (data.images && data.images.length > 0) {
              const normalized = data.images.map(img => ({
                url: resolveImageUrl(img.url || img),
                category: category.toUpperCase(),
                subCategory: subCategory.toUpperCase(),
              }));

              // Replace state with fresh server images
              onChange(normalized);
            }
          }
        } catch (err) {
          console.error("Upload failed", err);
        } finally {
          setBusy(false);
        }
      };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
     <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => uploadFiles(e.target.files)}  // ✅ fix
        disabled={busy}
        className="hidden"
        id="uploader"
      />
      <label
        htmlFor="uploader"
        className={`cursor-pointer text-sm px-4 py-2 rounded-lg ${
          busy ? "bg-gray-300" : "bg-teal-800 text-white hover:bg-pink-600"
        }`}
      >
        {busy ? "Uploading..." : "Upload Images"}
      </label>
    </div>
  );
}
