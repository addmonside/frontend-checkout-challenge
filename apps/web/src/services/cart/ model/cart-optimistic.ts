import type { QueryClient } from '@tanstack/react-query';
import { getGetCartQueryKey, getGetCheckoutOptionsQueryKey } from '@/shared/api';
import type { GetCart200 } from '@/shared/api/gen/model/getCart200';
import type { GetCheckoutOptions200 } from '@/shared/api/gen/model/getCheckoutOptions200';

type CartItemLike = {
  productId: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

type CartTransform = <T extends CartItemLike>(items: T[]) => T[] | null;

export type OptimisticCartContext = {
  previous?: GetCart200;
  previousCheckoutOptions?: GetCheckoutOptions200;
};

export function recomputeCartState<T extends CartItemLike>(items: T[]) {
  return {
    items,
    quantity: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0),
  };
}

export function removeCartItemByProductId<T extends CartItemLike>(
  items: T[],
  productId: string,
): T[] | null {
  const existing = items.find((item) => item.productId === productId);
  if (!existing) return null;
  return items.filter((item) => item.productId !== productId);
}

export function setCartItemQuantityByProductId<T extends CartItemLike>(
  items: T[],
  productId: string,
  quantity: number,
): T[] | null {
  const existing = items.find((item) => item.productId === productId);
  if (!existing) return null;
  return items.map((item) =>
    item.productId === productId
      ? { ...item, quantity, lineTotal: item.unitPrice * quantity }
      : item,
  );
}

export async function optimisticUpdateCart(
  queryClient: QueryClient,
  transform: CartTransform,
): Promise<OptimisticCartContext> {
  const cartQueryKey = getGetCartQueryKey();
  const optionsQueryKey = getGetCheckoutOptionsQueryKey();

  await queryClient.cancelQueries({ queryKey: cartQueryKey });
  await queryClient.cancelQueries({ queryKey: optionsQueryKey });

  const previous = queryClient.getQueryData<GetCart200>(cartQueryKey);
  const previousCheckoutOptions = queryClient.getQueryData<GetCheckoutOptions200>(optionsQueryKey);

  if (previous) {
    const items = transform(previous.data.items);
    if (items) {
      const cart = recomputeCartState(items);
      queryClient.setQueryData<GetCart200>(cartQueryKey, {
        ...previous,
        data: { ...previous.data, ...cart },
      });
    }
  }

  if (previousCheckoutOptions) {
    const items = transform(previousCheckoutOptions.data.cart.items);
    if (items) {
      const cart = recomputeCartState(items);
      queryClient.setQueryData<GetCheckoutOptions200>(optionsQueryKey, {
        ...previousCheckoutOptions,
        data: {
          ...previousCheckoutOptions.data,
          cart: { ...previousCheckoutOptions.data.cart, ...cart },
        },
      });
    }
  }

  return { previous, previousCheckoutOptions };
}

export function rollbackOptimisticCart(queryClient: QueryClient, context: OptimisticCartContext) {
  if (context.previous) {
    queryClient.setQueryData(getGetCartQueryKey(), context.previous);
  }
  if (context.previousCheckoutOptions) {
    queryClient.setQueryData(getGetCheckoutOptionsQueryKey(), context.previousCheckoutOptions);
  }
}

export function invalidateCartQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
  queryClient.invalidateQueries({ queryKey: getGetCheckoutOptionsQueryKey() });
}
