import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useCart } from "../store/useCart";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:9494";

export default function ImageGallery({
  images = [],
  onReorder,
  onDelete,
  onUpdate,
  isVendor = false, // ✅ only true if admin
}) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const add = useCart((s) => s.add);

   const { hasRole, hasAnyRole } = useAuth();

   console.log("hasRole: ", hasAnyRole(["vendor", "customer", "admin"]));

  const safeImages = Array.isArray(images)
    ? images
        .filter((img) => img && img.url)
        .map((img, idx) => ({
          id: img.id ?? `${img.category}-${idx}`,
          name: img.name ?? "Unnamed Product",
          price: !isNaN(Number(img.price)) ? Number(img.price) : 0.0,
          url: img.url,
          category: img.category || "uncategorized",
          subCategory: img.subCategory || "general",
        }))
    : [];

  const prev = () =>
    setCurrentIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setCurrentIdx((i) => (i + 1) % safeImages.length);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = Array.from(safeImages);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    onReorder && onReorder(newOrder);
  };

  function getImageSrc(img) {
    if (!img || !img.url) return "/fallback.png";
    return img.url.startsWith("http") ? img.url : `${BASE_URL}${img.url}`;
  }

  const grouped = safeImages.reduce((acc, img) => {
    const cat = img.category || "uncategorized";
    const sub = img.subCategory || "general";
    if (!acc[cat]) acc[cat] = {};
    if (!acc[cat][sub]) acc[cat][sub] = [];
    acc[cat][sub].push(img);
    return acc;
  }, {});

  const handleAddToCart = (img) => {
    add({
      id: img.id,
      name: img.name,
      price: img.price,
      image: img.url,
    });

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-shrink-0">
            <img
              src={getImageSrc(img)}
              alt={img.name}
              className="h-12 w-12 rounded-l-lg object-cover"
            />
          </div>
          <div className="flex-1 p-3">
            <p className="text-sm font-medium text-gray-900">{img.name}</p>
            <p className="text-sm text-gray-500">₹{img.price.toFixed(2)}</p>
          </div>
        </div>
      ),
      { duration: 2500, position: "top-right" }
    );
  };

  function getGlobalIndex(img) {
    return safeImages.findIndex(
      (i) =>
        i.id === img.id &&
        i.category === img.category &&
        i.subCategory === img.subCategory
    );
  }

  return (
    <div className="w-full">
      {/* Main Preview */}
      {safeImages.length > 0 && (
        <div className="relative aspect-[16/9] bg-gray-50 rounded-2xl overflow-hidden mb-6">
          <img
            src={getImageSrc(safeImages[currentIdx])}
            alt={safeImages[currentIdx]?.name || "preview"}
            className="w-full h-full object-cover"
          />
          {safeImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-3 py-1"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-3 py-1"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Grouped Categories */}
      {Object.entries(grouped).map(([cat, subs]) => (
        <div key={cat} className="mb-6">
          <h2 className="text-lg font-bold capitalize mb-2">{cat}</h2>
          {Object.entries(subs).map(([sub, imgs]) => (
            <div key={sub} className="ml-4 mb-4">
              <h3 className="text-md font-semibold capitalize mb-2">{sub}</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={`${cat}-${sub}`} direction="horizontal">
                  {(provided) => (
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {imgs.map((img, idx) => {
                        const src = getImageSrc(img);
                        return (
                          <Draggable
                            key={`${img.id || "noid"}-${idx}`}
                            draggableId={`${img.id || "noid"}-${idx}`}
                            index={idx}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="relative w-full aspect-square flex flex-col"
                              >
                                <img
                                  src={src}
                                  alt={img.name || `${cat}-${sub}-${idx}`}
                                  className="w-full h-full object-cover rounded-lg border"
                                  onClick={() =>
                                    setCurrentIdx(getGlobalIndex(img))
                                  }
                                />

                                {/* ✅ Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs flex flex-col p-2 rounded-b-lg space-y-2">
                                  {/* Price Row */}
                                  <div className="flex items-center justify-between">
                                    {hasRole("vendor") ? (
                                      <input
                                        type="number"
                                        min="0"
                                        defaultValue={img.price}
                                        className="w-20 px-1 text-black rounded"
                                        onBlur={(e) =>
                                          onUpdate &&
                                          onUpdate({
                                            ...img,
                                            price:
                                              parseFloat(e.target.value) || 0,
                                          })
                                        }
                                      />
                                    ) : (
                                      <span className="font-semibold">
                                        ₹{Number(img.price || 0).toFixed(2)}
                                      </span>
                                    )}
                                  </div>

                                  {/* Actions Row */}
                                  <div className="flex items-center justify-between">
                                    {hasRole("vendor") && (
                                      <button
                                        onClick={() => onDelete(idx, cat)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                                      >
                                        Delete
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleAddToCart(img)}
                                      className="ml-auto rounded-xl px-3 py-1 bg-primary text-white hover:opacity-90 text-xs"
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
