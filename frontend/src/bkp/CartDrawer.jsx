import React from 'react'
import { useCart } from '../store/useCart'
import { Link } from 'react-router-dom'

export default function CartDrawer({ open, onClose }) {
  const items = useCart((s) => s.items)
  const inc = useCart((s) => s.inc)
  const dec = useCart((s) => s.dec)
  const remove = useCart((s) => s.remove)
  const subtotal = useCart((s) => s.subtotal)

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-96 max-w-full bg-white shadow-xl p-4 transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
          {items.length === 0 && (
            <div className="text-sm text-gray-500">Your cart is empty.</div>
          )}
          {items.map((i, idx) => (
            <div
              key={`${i.id || "no-id"}-${i.image || "no-img"}-${idx}`} // ✅ always unique
              className="flex gap-3 items-center"
            >
              <img
                src={i.image || i.images?.[0]}
                alt={i.name || "Unnamed"}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="font-medium">{i.name || "Unknown Product"}</div>
                <div className="text-sm text-gray-500">₹{Number(i.price || 0).toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dec(i.id)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{i.qty}</span>
                  <button
                    onClick={() => inc(i.id)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(i.id)}
                    className="ml-2 text-xs text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>₹{subtotal().toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="mt-3 block text-center rounded-xl px-4 py-2 bg-secondary text-white hover:opacity-90"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
