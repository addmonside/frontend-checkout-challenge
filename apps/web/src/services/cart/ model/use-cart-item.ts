import { useCart } from './use-cart';

export const useCartItem = (productId: string) => {
  const { items, isPending } = useCart();
  const item = items.find((i) => i.productId === productId) ?? null;
  return { item, isPending };
};
