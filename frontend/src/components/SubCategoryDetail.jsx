import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import ImageUploader from "../components/ImageUploader";

const BASE_URL = "http://localhost:9494";

export default function SubCategoryDetail({ category, subCategory }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    //console.log("🔄 Fetching images for", category, subCategory);

    setImages([]); // reset before fetching new
    fetch(`${BASE_URL}/api/v1/images/${category}/${subCategory}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
         const allImages = data.flatMap((p) =>
            p.images?.map((img, idx) => ({
              productId: p.id,             // keep the real product id for backend
              id: `${p.id}-${idx}`,        // unique key per image for React
              name: p.name,
              price: p.price ?? 0,
              url: `${BASE_URL}${img.url}`,
              category: img.category || p.category,
              subCategory: img.subCategory || subCategory,
            })) || []
          );
          //console.log("✅ Mapped images:", allImages);
          setImages(allImages);
        } else {
          setImages([]);
        }
      })
      .catch(err => {
        console.error("❌ Fetch failed:", err);
        setImages([]);
      });
  }, [category, subCategory]);

  const handleAdd = (newImages) => {
    const safe = Array.isArray(newImages) ? newImages : [newImages];
    setImages((prev) => [...prev, ...safe]);
  };

  const handleUpdate = async (updatedImg) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/products/${updatedImg.productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedImg.name,
          price: updatedImg.price,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      // only update matching UI id
      setImages((prev) =>
        prev.map((img) =>
          img.id === updatedImg.id
            ? { ...img, price: updated.price, name: updated.name }
            : img
        )
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (productId) => {
    const res = await fetch(`${BASE_URL}/api/v1/products/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("delete failed");

    // Remove all images belonging to that productId
    setImages((prev) => prev.filter((img) => img.productId !== productId));
  };

  return (
    <div>
      <ImageGallery
        images={images}
        onUpdate={handleUpdate}   // ✅ new
        onDelete={handleDelete}
        isVendor={true}
      />
      <ImageUploader
        productCode={`${category}-${subCategory}`}
        category={category}
        subCategory={subCategory}
        onChange={handleAdd}
      />
    </div>
  );
}
