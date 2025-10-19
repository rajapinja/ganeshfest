import React, { useState } from "react";
import { resolveImageUrl } from "../utils/image";
import { convertToWebP } from "../utils/imageUtils";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:9494";

export default function ImageUploader({ 
  productCode, 
  category, 
  subCategory,
  onChange 
}) {
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { hasRole } = useAuth();

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
      form.append("name", name || "Untitled Product");
      form.append("price", price || "0.0");

      console.log("form:", form);

      const res = await fetch(
        `${BASE_URL}/api/v1/products/${category}/${subCategory}/products`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json(); // ✅ ProductDto from backend
      console.log("📦 server response:", data);

      // Normalize just ONE product
      const normalized = {
        id: data.id,
        name: data.name || name,
        price:
          typeof data.price === "number"
            ? data.price
            : isNaN(Number(price))
            ? 0.0
            : Number(price),
        url: data.images?.[0]?.url
          ? resolveImageUrl(data.images[0].url)
          : "/fallback.png",
        category: category.toUpperCase(),
        subCategory: subCategory.toUpperCase(),
      };

      // Push this new product back up
      onChange([normalized]);
    }
  } catch (err) {
    console.error("Upload failed", err);
  } finally {
    setBusy(false);
  }
};


  return ( hasRole("vendor") && (
    <div className="flex flex-col gap-3 items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
      {/* Product details */}
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <input
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => uploadFiles(e.target.files)}
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
  ));
}
