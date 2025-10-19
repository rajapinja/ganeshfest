import { Link } from "react-router-dom"
import { useCart } from "../store/useCart"

export default function Header() {
  const items = useCart((s) => s.items)
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <Link to="/">🏪 Shop</Link>
      <Link to="/cart" className="relative">
        🛒 Cart
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {totalQty}
          </span>
        )}
      </Link>
    </header>
  )
}
