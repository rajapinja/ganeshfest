import React, { useState } from "react";

export default function Registration() {
  const [mode, setMode] = useState("customer");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Toggle Buttons */}
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

      {mode === "customer" ? (
        <CustomerForm />
      ) : (
        <VendorForm />
      )}
    </div>
  );
}

function CustomerForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, role: "CUSTOMER" };

    try {
      const res = await fetch("http://localhost:9494/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("✅ Customer registered successfully!");
        setForm({ name: "", phone: "", email: "", address: "", city: "", notes: "" });
      } else {
        alert("❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error during registration");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border dark:bg-gray-300 dark:text-gray-600"
    >
      <Input label="Name" name="name" value={form.name} onChange={handleChange} />
      <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
      <Input label="Email" name="email" value={form.email} onChange={handleChange} />
      <Input label="Apartment/Colony" name="address" value={form.address} onChange={handleChange} />
      <Input label="City" name="city" value={form.city} onChange={handleChange} />
      <div className="md:col-span-2">
        <label className="text-sm">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2"
          rows={3}
          placeholder="Requirements (sizes, dates, packages)"
        />
      </div>
      <button className="md:col-span-2 rounded-xl bg-secondary text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}

function VendorForm() {
  const [form, setForm] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    category: "",
    catalogUrl: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, role: "VENDOR" };

    try {
      const res = await fetch("http://localhost:9494/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("✅ Vendor registered successfully!");
        setForm({
          businessName: "",
          contactPerson: "",
          phone: "",
          email: "",
          category: "",
          catalogUrl: "",
        });
      } else {
        alert("❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error during registration");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border dark:bg-gray-300 dark:bg-gray-600"
    >
      <Input label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} />
      <Input label="Contact Person" name="contactPerson" value={form.contactPerson} onChange={handleChange} />
      <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
      <Input label="Email" name="email" value={form.email} onChange={handleChange} />
      <Input label="Category (e.g., Idols, Food, Pooja)" name="category" value={form.category} onChange={handleChange} />
      <div className="md:col-span-2">
        <label className="text-sm">Catalog URL (optional)</label>
        <input
          name="catalogUrl"
          value={form.catalogUrl}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2"
          placeholder="https://..."
        />
      </div>
      <button className="md:col-span-2 rounded-xl bg-secondary text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-xl border px-3 py-2"
      />
    </div>
  );
}
