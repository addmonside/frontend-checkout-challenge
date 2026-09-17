import { useGetCheckoutOptions } from '@/shared/api';
import { GetCheckoutOptions200Data } from '@/shared/api/gen/model';

export const useCheckoutOptions = () => {
  const { data, isPending } = useGetCheckoutOptions();

  const options =
    typeof data?.data === 'object' &&
    'cart' in data.data &&
    'deliveryMethods' in data.data &&
    'paymentMethods' in data.data
      ? (data.data as GetCheckoutOptions200Data)
      : undefined;

  return {
    deliveryMethods: options?.deliveryMethods,
    paymentMethods: options?.paymentMethods,
    cart: options?.cart,
    isPending,
  };
};
