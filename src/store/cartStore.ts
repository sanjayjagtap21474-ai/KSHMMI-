import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product, ProductVariant } from '@/types';

interface CartStore extends Cart {
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      subtotal: 0,
      discount: 0,

      addItem: (product: Product, variant: ProductVariant, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.productId === product.id && item.variantId === variant.id
        );

        let newItems: CartItem[];

        if (existingItem) {
          newItems = items.map((item) =>
            item.productId === product.id && item.variantId === variant.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...items,
            {
              productId: product.id,
              variantId: variant.id,
              quantity,
              product,
              variant,
            },
          ];
        }

        const subtotal = newItems.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        );

        set({
          items: newItems,
          subtotal,
          total: subtotal,
        });
      },

      removeItem: (productId: string, variantId: string) => {
        const items = get().items.filter(
          (item) => !(item.productId === productId && item.variantId === variantId)
        );

        const subtotal = items.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        );

        set({
          items,
          subtotal,
          total: subtotal,
        });
      },

      updateQuantity: (productId: string, variantId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const items = get().items.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity }
            : item
        );

        const subtotal = items.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        );

        set({
          items,
          subtotal,
          total: subtotal,
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          subtotal: 0,
          discount: 0,
        });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'kshmmi-cart',
    }
  )
);
