import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AIServices() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateDesigns = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9494/api/ai/design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Keycloak token in Authorization header
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
      alert("Error generating design");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (image) => {
    await fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: null, // AI product has no static ID
        name: "Custom Ganesh Idol",
        unitPrice: 5000, // example
        designUrl: image,
        quantity: 1,
      }),
    });
    alert("Added to cart!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎨 AI Idol Design Service</h1>
      <textarea
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Describe your Ganesh idol (pose, size, style, colors)..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={generateDesigns} disabled={loading}>
        {loading ? "Generating..." : "Generate Designs"}
      </Button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.map((img, idx) => (
          <Card key={idx} className="cursor-pointer hover:shadow-xl">
            <CardContent>
              <img src={img} alt="AI Idol" className="rounded-lg" />
              <Button
                className="w-full mt-2"
                onClick={() => addToCart(img)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
