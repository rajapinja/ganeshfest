import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import ImageUploader from "../components/ImageUploader";

const BASE_URL = "http://localhost:9494";

export default function SubCategoryDetail({ category, subCategory }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("🔄 Fetching images for", category, subCategory);

    setImages([]); // reset before fetching new
    fetch(`${BASE_URL}/api/v1/images/${category}/${subCategory}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const allImages = data.flatMap((p) =>
            p.images?.map((img) => ({
              id: p.id,
              name: p.name,
              price: p.price ?? 0,
              url: `${BASE_URL}${img.url}`,
              category: img.category || p.category,
              subCategory: img.subCategory || subCategory,
            })) || []
          );
          console.log("✅ Mapped images:", allImages);
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
      const res = await fetch(`${BASE_URL}/api/v1/products/${updatedImg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedImg.name,
          price: updatedImg.price,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      setImages((prev) =>
        prev.map((img) => (img.id === updatedImg.id ? updatedImg : img))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };


  const handleDelete = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
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
