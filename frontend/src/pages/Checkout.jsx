import React from 'react'
import { useCart } from '../store/useCart'

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const [note, setNote] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Order placed! (stub)')
    clear()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card p-4">
        <h2 className="text-lg font-semibold mb-3">Order Details</h2>
        <ul className="divide-y">
          {items.map(i => (
            <li key={i.id} className="py-2 flex justify-between">
              <span>{i.name} × {i.qty}</span>
              <span>₹{(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold mt-3">
          <span>Subtotal</span>
          <span>₹{subtotal().toFixed(2)}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="card p-4 space-y-3">
        <h2 className="text-lg font-semibold">Billing</h2>
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Name" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Phone" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Email" />
        <textarea className="w-full rounded-xl border px-3 py-2" rows={3} placeholder="Address" />
        <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full rounded-xl border px-3 py-2" rows={3} placeholder="Special Instructions (dates, timings)" />
        <button className="w-full rounded-xl bg-primary text-white px-4 py-2">Place Order</button>
      </form>
    </div>
  )
}
