import { useQueryClient } from '@tanstack/react-query';
import { useRemoveCartItem } from '@/shared/api';
import {
  invalidateCartQueries,
  optimisticUpdateCart,
  removeCartItemByProductId,
  rollbackOptimisticCart,
} from './cart-optimistic';

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useRemoveCartItem({
    mutation: {
      onMutate: ({ productId }) =>
        optimisticUpdateCart(queryClient, (items) => removeCartItemByProductId(items, productId)),
      onError: (_error, _variables, context) => {
        if (context) {
          rollbackOptimisticCart(queryClient, context);
        }
      },
      onSettled: () => invalidateCartQueries(queryClient),
    },
  });

  const removeCartItem = (productId: string) => {
    mutate({ productId });
  };

  return { removeCartItem, isPending };
}
