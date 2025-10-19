import { create } from "zustand"

export const useCart = create((set, get) => ({
  items: [],

  add: (product) => {
    const existing = get().items.find((i) => i.id === product.id)
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        ),
      })
    } else {
      set({ items: [...get().items, { ...product, qty: 1 }] })
    }
  },

  remove: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),

  inc: (id) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      ),
    }),

  dec: (id) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      ),
    }),

  clear: () => set({ items: [] }),

  subtotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}))
