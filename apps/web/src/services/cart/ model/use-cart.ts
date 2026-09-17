import { useGetCart } from '@/shared/api';
import type { GetCart200Data } from '@/shared/api/gen/model/getCart200Data';
import { appConfig } from '@/shared/model';

export function useCart() {
  const { data, isPending } = useGetCart();
  const cartData = data?.data;

  const items = isCartData(cartData) ? cartData.items : [];
  const quantity = isCartData(cartData) ? cartData.quantity : 0;
  const subtotal = isCartData(cartData) ? cartData.subtotal : 0;
  const currency = isCartData(cartData) ? cartData.currency : appConfig.defaultCurrency;
  const isEmpty = quantity === 0;

  return {
    items,
    quantity,
    subtotal,
    currency,
    isPending,
    isEmpty,
  };
}

function isCartData(value: unknown): value is GetCart200Data {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray((value as Partial<GetCart200Data>).items)
  );
}
