import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import ImageUploader from "../components/ImageUploader";

export default function ProductDetail({ product: initialProduct }) {
  if (!initialProduct) {
    return <div className="p-4">❌ Product not found</div>;
  }

  const [product, setProduct] = useState(initialProduct);
  const [images, setImages] = useState(initialProduct.images || []);  
  const isVendor = true;
  const [categories, setCategories] = useState({});

useEffect(() => {
  fetch("http://localhost:9494/api/v1/meta/categories")
    .then(res => res.json())
    .then(data => setCategories(data || {}))
    .catch(err => {
      console.error("Failed to load categories", err);
      setCategories({});
    });
}, []);


  // keep product.images in sync
  useEffect(() => {
    setImages(product.images || []);
  }, [product]);

  console.log("ProductDetails - images :",images);

  // handle reorder inside a category
  const handleReorder = (category, newOrder) => {
    const updated = images.map((img) =>
      img.category === category ? newOrder.find((n) => n.url === img.url) || img : img
    );
    setImages(updated);
    setProduct((prev) => ({ ...prev, images: updated }));
  };

  const handleDelete = (idx, category) => {
    const newArr = images.filter((_, i) => !(i === idx && _.category === category));
    setImages(newArr);
    setProduct((prev) => ({ ...prev, images: newArr }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {Object.entries(categories).map(([cat, subs]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{cat}</h2>

          {subs.map((sub) => {
            const filtered = images.filter(
              (img) => img.category === cat && img.subCategory === sub
            );

            return (
              <div key={sub} className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-700">{sub}</h3>

                <ImageGallery
                  images={filtered}
                  onReorder={(newOrder) =>
                    handleReorder(
                      cat,
                      newOrder.map((i) => ({
                        category: cat,
                        subCategory: sub,
                        url: i.url,
                      }))
                    )
                  }
                  onDelete={(idx) => handleDelete(idx, cat)}
                  isVendor={isVendor}
                />

                {isVendor && (
                  <ImageUploader
                    productCode={product.id}
                    category={cat}
                    subCategory={sub}
                    onChange={(newImages) => {
                      const safeImages = Array.isArray(newImages)
                        ? newImages
                        : [newImages];
                      setImages((prev) => [...prev, ...safeImages]);
                      setProduct((prev) => ({
                        ...prev,
                        images: [...prev.images, ...safeImages],
                      }));
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
  </div>

  );
}
