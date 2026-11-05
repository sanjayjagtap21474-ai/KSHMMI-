import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  productIds: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],

      addItem: (productId: string) => {
        const productIds = get().productIds;
        if (!productIds.includes(productId)) {
          set({ productIds: [...productIds, productId] });
        }
      },

      removeItem: (productId: string) => {
        set({
          productIds: get().productIds.filter((id) => id !== productId),
        });
      },

      toggleItem: (productId: string) => {
        const productIds = get().productIds;
        if (productIds.includes(productId)) {
          set({
            productIds: productIds.filter((id) => id !== productId),
          });
        } else {
          set({ productIds: [...productIds, productId] });
        }
      },

      isInWishlist: (productId: string) => {
        return get().productIds.includes(productId);
      },

      clearWishlist: () => {
        set({ productIds: [] });
      },
    }),
    {
      name: 'kshmmi-wishlist',
    }
  )
);
