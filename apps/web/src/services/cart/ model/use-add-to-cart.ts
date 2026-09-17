import { useQueryClient } from '@tanstack/react-query';
import { useSetCartItem } from '@/shared/api';
import {
  invalidateCartQueries,
  optimisticUpdateCart,
  rollbackOptimisticCart,
  setCartItemQuantityByProductId,
} from './cart-optimistic';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useSetCartItem({
    mutation: {
      onMutate: ({ productId, data }) =>
        optimisticUpdateCart(queryClient, (items) =>
          setCartItemQuantityByProductId(items, productId, data.quantity),
        ),
      onError: (_error, _variables, context) => {
        if (context) {
          rollbackOptimisticCart(queryClient, context);
        }
      },
      onSettled: () => invalidateCartQueries(queryClient),
    },
  });

  const addToCart = (productId: string, quantity: number = 1) => {
    mutate({ productId, data: { quantity } });
  };

  return { addToCart, isPending };
}
