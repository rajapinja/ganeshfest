import ProductCard from "../components/ProductCard";

const BASE_URL = "http://localhost:9494";

export default function CategoryPage({ products }) {
  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // dispatch(addToCart(product)) if using Redux/Zustand
  };

  const handleUpload = async (productId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("✅ Image uploaded successfully");
      } else {
        console.error("❌ Upload failed", await res.text());
      }
    } catch (err) {
      console.error("❌ Upload error", err);
    }
  };

  // Fix image URLs to always have BASE_URL
  const normalizedProducts = products.map((p) => ({
    ...p,
    images: p.images?.map((img) => ({
      ...img,
      url: img.url?.startsWith("http") ? img.url : `${BASE_URL}${img.url}`,
    })),
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {normalizedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onUpload={handleUpload} // hide if customer view only
        />
      ))}
    </div>
  );
}
