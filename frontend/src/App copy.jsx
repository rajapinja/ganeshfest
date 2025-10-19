import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";

import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import CartDrawer from "./components/CartDrawer";
import AIServices from "./ai/AIServices";

// Sample product data for frontend demo
const products = [
  {
    id: "idol-01",
    name: "Ganesh Idol - Small",
    images: [
      "/images/idol1-1.jpg",
      "/images/idol1-2.jpg",
      "/images/idol1-3.jpg",
    ],
    category: "idols",
    price: 1200,
  },
  {
    id: "idol-02",
    name: "Ganesh Idol - Medium",
    images: [
      "/images/idol2-1.jpg",
      "/images/idol2-2.jpg",
    ],
    category: "idols",
    price: 1800,
  },
  {
    id: "food-01",
    name: "Tiffin Pack",
    images: ["/images/food1.jpg"],
    category: "food",
    price: 250,
  },
];

// wrapper component
function ProductDetailWrapper({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  if (!product) return <div className="p-4">❌ Product not found</div>;

  return <ProductDetail product={product} />;
}


export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar with search + cart */}
      <Topbar
        title="🕉️ Vinayaka Services"
        onSearch={(q) => setSearch(q)}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="flex flex-1 ">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block bg-gray-200 dark:bg-gray-900 shadow-lg">
          <SideNav />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-gradient-to-r dark:bg-gray-200 dark:text-gray-500">
          <Routes>
            <Route path="/" element={<Home products={products} search={search} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:slug" element={<CategoryPage products={products} />} />
           <Route
              path="/product/:id"
              element={<ProductDetailWrapper products={products} />}
            />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
