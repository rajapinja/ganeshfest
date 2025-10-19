// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../store/useCart";

// Import fixed local assets
import smallImg from "../assets/ganesha-home.jpg";
import bigImg from "../assets/ganesha-big.png";
import ganeshImg from "../assets/ganesha-medium.png";
import mainCourseImg from "../assets/main-course.jpg";
import mainCourse1Img from "../assets/main-course1.jpg";

// Explicit mapping of product names to fixed images
const fixedImages = {
  "ganesh idol - small (clay)": ganeshImg,
  "ganesh idol - large (asbestos)": bigImg,
  "tiffin pack": mainCourseImg,
  "main course meal": mainCourse1Img,
};

// Normalize string for matching
function normalizeKey(str = "") {
  return str.toLowerCase().trim();
}

export default function ProductCard({ product }) {
  const add = useCart((s) => s.add);

  const nameKey = normalizeKey(product.name);
  const cover =
    fixedImages[nameKey] ||
    product.images?.[0] ||
    product.image ||
    ganeshImg; // ultimate fallback

  // Decide route base by category
  const categoryKey = normalizeKey(product.category);
  const routeBase = categoryKey.includes("idol") ? "idols" : "food";

  return (
    <div className="card p-3 flex flex-col bg-gray-100 dark:bg-gray-600 dark:text-gray-200 rounded-lg shadow">
      <Link to={`/product/${product.id}`}>
        <img
          src={cover}
          alt={product.name}
          className="h-56 w-full object-cover rounded-xl"
          onError={(e) => {
            console.warn("Broken image for:", product.name, "→", cover);
            e.currentTarget.src = ganeshImg;
          }}
        />
      </Link>

      <div className="mt-3 flex-1">
        <Link
          to={`/product/${product.id}`}
          className="font-semibold hover:underline"
        >
          {product.name}
        </Link>
        <div className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </div>
        <div className="mt-2 font-bold">₹{product.price}</div>
      </div>

      <button
        onClick={() =>
          add({
            id: product.id,
            name: product.name,
            price: product.price,
            image: cover,
          })
        }
        className="mt-3 inline-flex justify-center rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
}
