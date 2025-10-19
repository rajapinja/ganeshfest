import { useParams } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";

export default function ProductDetailWrapper({ products }) {
  const { id } = useParams();
  console.log("Route param:", id);

  const product = products.find((p) => p.id === id);
  console.log("Matched product:", product);

  if (!product) {
    return <div className="p-4 text-red-600">❌ Product not found for id: {id}</div>;
  }

  return <ProductDetail product={product} />;
}
