// ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../store/useCart"; // adjust path if needed

const BASE_URL = "http://localhost:9494";

export default function ProductCard({ product }) {
  const add = useCart((s) => s.add)
  const cover = product.images?.[0] || product.image

  return (
    <div className="card p-3 flex flex-col bg-gray-100 dark:bg-gray-600 dark:text-gray-200 rounded-lg shadow">
      <Link to={`/product/${product.id}`}>
        <img
          src={cover}
          alt={product.name}
          className="h-40 w-full object-cover rounded-xl"
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
  )
}