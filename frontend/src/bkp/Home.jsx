import React from "react";
import ProductGrid from "../components/ProductGrid";

export default function Home({ products = [], search = "" }) {
  // Filter products based on search
  const filtered = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          Ganesh Chaturthi — One-Stop Services
        </h1>
        <p className="text-gray-600 mt-1">
          Idols • Decorations • Pooja • Food • Tent • Nimajjanam • Event Management
        </p>
      </section>

      {/* Popular Packages */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Popular Packages</h2>
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </section>
    </div>
  );
}
