import { Product } from "@/lib/types/products";
import { filter, find, map } from "ramda";
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

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = find(
            (item) => item.id === product.id,
            state.items
          );

          if (existingItem) {
            return {
              items: map(
                (item) =>
                  item.id === product.id && item.quantity
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                state.items
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      removeItem: (product) =>
        set((state) => ({
          items: filter((item) => item.id !== product.id, state.items),
        })),
      addQuantity: (product) =>
        set((state) => ({
          items: map(
            (item) =>
              item.id === product.id && item.quantity
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            state.items
          ),
        })),
      removeQuantity: (product) =>
        set((state) => ({
          items: map(
            (item) =>
              item.id === product.id && item.quantity && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            state.items
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
