import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import ImageUploader from "../components/ImageUploader";

export default function ProductDetail({ product }) {
  if (!product) {
    return <div className="p-4">❌ Product not found</div>;
  }

  const [images, setImages] = useState(product.images || []);
  const isVendor = true; // toggle based on role later

  useEffect(() => {
    setImages(product.images || []);
  }, [product]);

  const handleUpload = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleReorder = (newOrder) => {
    setImages(newOrder);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <ImageGallery
        images={images}
        onReorder={handleReorder}
        isVendor={isVendor}
      />

      {isVendor && <ImageUploader onUpload={handleUpload} />}
    </div>
  );
}
