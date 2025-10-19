import React from 'react'

export default function Registration() {
  const [mode, setMode] = React.useState('customer')

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex gap-2 ">
        <button
            onClick={() => setMode("customer")}
            className={`px-4 py-2 rounded-xl border transition 
              ${mode === "customer" 
                ? "bg-primary text-white border-primary" 
                : "bg-transparent text-gray-800 border-gray-400 dark:text-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"}`}
          >
            Customer
          </button>

          <button
            onClick={() => setMode("vendor")}
            className={`px-4 py-2 rounded-xl border transition 
              ${mode === "vendor" 
                ? "bg-primary text-white border-primary" 
                : "bg-transparent text-gray-800 border-gray-400 dark:text-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"}`}
          >
            Vendor
          </button>
      </div>
      {mode === 'customer' ? <CustomerForm /> : <VendorForm />}
    </div>
  )
}

function CustomerForm() {
  return (
    <form className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border dark:bg-gray-300 dark:text-gray-600">
      <Input label="Name" />
      <Input label="Phone" />
      <Input label="Email" />
      <Input label="Apartment/Colony" />
      <Input label="City" />
      <div className="md:col-span-2">
        <label className="text-sm">Notes</label>
        <textarea className="w-full rounded-xl border px-3 py-2" rows={3} placeholder="Requirements (sizes, dates, packages)"/>
      </div>
      <button className="md:col-span-2 rounded-xl bg-secondary text-white px-4 py-2">Register</button>
    </form>
  )
}

function VendorForm() {
  return (
    <form className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border dark:bg-gray-300 dark:bg-gray-600">
      <Input label="Business Name" />
      <Input label="Contact Person" />
      <Input label="Phone" />
      <Input label="Email" />
      <Input label="Category (e.g., Idols, Food, Pooja)" />
      <div className="md:col-span-2">
        <label className="text-sm">Catalog URL (optional)</label>
        <input className="w-full rounded-xl border px-3 py-2" placeholder="https://..." />
      </div>
      <button className="md:col-span-2 rounded-xl bg-secondary text-white px-4 py-2">Register</button>
    </form>
  )
}

function Input({ label }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input className="rounded-xl border px-3 py-2" />
    </div>
  )
}
