import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-2">
          <img
            src={p.images?.[0]}
            alt={p.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="mt-2 font-medium">{p.name}</h3>
          <p className="text-sm text-gray-500">{p.description}</p>
          <p className="font-semibold mt-1">₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}
