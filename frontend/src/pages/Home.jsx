import React from "react";
import { Users, ShoppingCart, Sparkles, LayoutGrid } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import ServicesLine from "../components/ServicesLine";

export default function Home({ products = [], search = "" }) {
  // Filter products based on search
  const filtered = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <ServicesLine />
        <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
          <div className="flex items-start space-x-3 text-left">
            <Users className="w-5 h-5 text-blue-600 mt-1" />
            <p className="text-gray-700 text-sm md:text-base">
              Vendors can register and showcase their offerings by uploading images
              with price tags.
            </p>
          </div>
          <div className="flex items-start space-x-3 text-left">
            <ShoppingCart className="w-5 h-5 text-green-600 mt-1" />
            <p className="text-gray-700 text-sm md:text-base">
              Customers can browse and order products, and make advance bookings.
            </p>
          </div>
          <div className="flex items-start space-x-3 text-left">
            <Sparkles className="w-5 h-5 text-pink-500 mt-1" />
            <p className="text-gray-700 text-sm md:text-base">
              Create personalized idols using AI tools and order them directly.
            </p>
          </div>
          <div className="flex items-start space-x-3 text-left">
            <LayoutGrid className="w-5 h-5 text-purple-600 mt-1" />
            <p className="text-gray-700 text-sm md:text-base">
              Categories and sub-categories simplify navigation and discovery.
            </p>
          </div>
        </div>
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
