import { Product } from "@/lib/types/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  addQuantity: (product: Product) => void;
  removeQuantity: (product: Product) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.quantity
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      removeItem: (product) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== product.id),
        })),
      addQuantity: (product) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === product.id && item.quantity
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      removeQuantity: (product) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === product.id && item.quantity && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
