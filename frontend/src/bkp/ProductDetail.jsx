import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import ImageUploader from "../components/ImageUploader";

export default function ProductDetail({ product: initialProduct }) {
  if (!initialProduct) {
    return <div className="p-4">❌ Product not found</div>;
  }

  const [product, setProduct] = useState(initialProduct);
  const [images, setImages] = useState(initialProduct.images || []);
  const isVendor = true; // TODO: replace with real role check

  // keep product.images in sync
  useEffect(() => {
    setImages(product.images || []);
  }, [product]);

  // Handle reorder
  const handleReorder = (newOrder) => {
    setImages(newOrder);
    setProduct((prev) => ({ ...prev, images: newOrder }));
  };

  // Handle delete
  const handleDelete = (idx) => {
    const newArr = images.filter((_, i) => i !== idx);
    setImages(newArr);
    setProduct((prev) => ({ ...prev, images: newArr }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      <ImageGallery
        images={images}
        onReorder={handleReorder}
        onDelete={handleDelete}
        isVendor={isVendor}
      />

      {isVendor && (
        <ImageUploader
          productCode={product.id}
          images={images}
          onChange={(newImages) => {
            setImages(newImages);
            setProduct((prev) => ({ ...prev, images: newImages }));
          }}
        />
      )}
    </div>
  );
}
