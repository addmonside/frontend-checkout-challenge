import { useQueryClient } from '@tanstack/react-query';
import { getGetCartQueryKey, useSetCartItem } from '@/shared/api';
import type { GetCart200 } from '@/shared/api/gen/model/getCart200';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useSetCartItem({
    mutation: {
      onMutate: async ({ productId, data }) => {
        const queryKey = getGetCartQueryKey();
        await queryClient.cancelQueries({ queryKey });
        const previous = queryClient.getQueryData<GetCart200>(queryKey);
        if (!previous) return { previous };
        const cart = previous.data;

        const existing = cart.items.find((item) => item.productId === productId);
        if (!existing) return { previous };

        const items = cart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: data.quantity, lineTotal: item.unitPrice * data.quantity }
            : item,
        );

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

  const addToCart = (productId: string, quantity: number = 1) => {
    mutate({ productId, data: { quantity } });
  };

  return { addToCart, isPending };
}
