// ProductCard.jsx
import { useState } from "react";

export default function ProductCard({ product, onAddToCart, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(product.id, selectedFile);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <img
        src={product.images?.[0]?.url}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold mt-1">₹{product.price}</p>

      {/* Add to Cart */}
      <button
        onClick={() => onAddToCart(product)}
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
      >
        Add to Cart
      </button>

      {/* Upload option (visible for admin/vendor only) */}
      {onUpload && (
        <div className="mt-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500"
          />
          <button
            onClick={handleUpload}
            className="mt-1 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}
