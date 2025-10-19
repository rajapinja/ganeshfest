import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import keycloak from '../auth/keycloak'

export default function Toolbar({ onOpenCart }) {
  const [q, setQ] = React.useState('')
  const nav = useNavigate()

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="text-xl font-extrabold text-primary">Vinayaka</Link>
        <div className="flex-1" />
        <form onSubmit={(e) => { e.preventDefault(); nav(`/category/search?q=${encodeURIComponent(q)}`) }} className="hidden md:block">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search idols, food, pooja items..." className="w-96 rounded-xl border px-3 py-2" />
        </form>
        <button onClick={onOpenCart} className="ml-2 rounded-xl border px-3 py-2">Cart</button>
        {keycloak?.authenticated ? (
          <button onClick={() => keycloak.logout()} className="ml-2 rounded-xl bg-primary text-white px-3 py-2">Logout</button>
        ) : (
          <button onClick={() => keycloak.login()} className="ml-2 rounded-xl bg-primary text-white px-3 py-2">Login</button>
        )}
      </div>
    </header>
  )
}
