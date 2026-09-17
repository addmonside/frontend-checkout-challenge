import { useQueryClient } from '@tanstack/react-query';
import { getGetCartQueryKey, useRemoveCartItem } from '@/shared/api';
import type { GetCart200 } from '@/shared/api/gen/model/getCart200';

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useRemoveCartItem({
    mutation: {
      onMutate: async ({ productId }) => {
        const queryKey = getGetCartQueryKey();
        await queryClient.cancelQueries({ queryKey });
        const previous = queryClient.getQueryData<GetCart200>(queryKey);
        if (!previous) return { previous };
        const cart = previous.data;

        const existing = cart.items.find((item) => item.productId === productId);
        if (!existing) return { previous };

        const items = cart.items.filter((item) => item.productId !== productId);

        queryClient.setQueryData<GetCart200>(queryKey, {
          ...previous,
          data: {
            ...cart,
            items,
            quantity: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0),
          },
        });

        return { previous };
      },
      onError: (_error, _variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(getGetCartQueryKey(), context.previous);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
      },
    },
  });

  const removeCartItem = (productId: string) => {
    mutate({ productId });
  };

  return { removeCartItem, isPending };
}
