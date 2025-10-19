import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import CartDrawer from "./components/CartDrawer";
import ProductDetailWrapper from "./components/ProductDetailWrapper";
import CategoryContainer from "./components/CategoryContainer"; // ✅ new container
import CartSummary from "./store/CartSummary"
import ProductDetail from "./pages/ProductDetail";
import { Toaster } from "react-hot-toast";
import DebugRoles from "./components/DebugRoles";
import AISservices from "./components/GaneshaIdols";
import GaneshaExpenditure from "./components/GaneshaExpenditure";
import DeploymentSteps from "./components/DeploymentSteps";


const products = [
  {
    id: "ganesha-home",
    name: "Ganesh Idol - Small (Clay)",
    description: "Eco-friendly clay idol, small size.",
    images: ["/images/ganesha-home.jpg"],
    category: "idols",
    subCategory: "clay-small", 
    price: 1200,
  },
  {
    id: "ganesha-medium",
    name: "Ganesh Idol - Large (Asbestos)",
    description: "Durable asbestos idol, large size.",
    images: ["/images/ganesha-medium.png"],
    category: "idols",
    subCategory: "asbestos-large",  
    price: 2200,
  },
  {
    id: "mainCourseImg",
    name: "Tiffin Pack",
    description: "Delicious prasad thali.",
    images: ["/images/main-course.jpg"],
    category: "food",
    subCategory: "tiffins",   
    price: 250,
  },
  {
    id: "mainCourse1Img",
    name: "Main Course Meal",
    description: "Full traditional lunch meal.",
    images: ["/images/main-course1.jpg"],
    category: "food",
    subCategory: "main-course",
    price: 450,
  },
];

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar with search + cart */}
      <Topbar
        title="🕉️ Vinayaka Services"
        onSearch={(q) => setSearch(q)}
        onCartClick={() => setCartOpen(true)} //🔥 opens drawer        
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block bg-gray-100 dark:bg-gray-900 shadow-lg">
          <SideNav />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">
          <Routes>
            <Route
              path="/"
              element={<Home products={products} search={search} />}
            />          
            <Route path="/registration" element={<Registration />} />
            <Route path="/debugroles" element={<DebugRoles />} />
            <Route path="/aiservices" element={<AISservices />} />
            <Route path="/ganeshaexpenditure" element={<GaneshaExpenditure />} />
            <Route path="/deploymentsteps" element={<DeploymentSteps />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartSummary />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetail />} />
           

            {/* ✅ Category routes */}
            <Route path="/category/:category" element={<CategoryContainer />} />
            <Route path="/category/:category/:subCategory" element={<CategoryContainer key={window.location.pathname}/>} />

            <Route
              path="/product/:id"
              element={<ProductDetailWrapper products={products} />}
            />           
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>         
        </main>
      </div>

      {/* your existing layout */}
          <Toaster position="top-right" />
      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
