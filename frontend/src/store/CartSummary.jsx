import { useCart } from "../store/useCart"

export default function CartSummary() {
  const items = useCart((s) => s.items)
  const remove = useCart((s) => s.remove)
  const subtotal = useCart((s) => s.subtotal())

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Cart</h2>
      {items.length === 0 && <p>No items in cart.</p>}

      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-1">
          <span>
            {item.name} x {item.qty}
          </span>
          <button
            onClick={() => remove(item.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <p className="mt-2 font-bold">Total: ₹{subtotal}</p>
    </div>
  )
}
