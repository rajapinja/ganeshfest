import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

export default function CategoryPage() {
  const { slug } = useParams();
  const { search } = useLocation();
  const q = new URLSearchParams(search).get("q")?.toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/api/products"; // ✅ adjust to your Spring Boot base path

    // if category/sub-category provided
    if (slug && slug !== "search") {
      url = `/api/products/category/${slug}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [slug, search]);

  // ✅ client-side search (if ?q is used)
  let filtered = products;
  if (slug === "search" && q) {
    filtered = products.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold capitalize">
        {slug?.replace("-", " ") || "Category"}
      </h1>
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}
