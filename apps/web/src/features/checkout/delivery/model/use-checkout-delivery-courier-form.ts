import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CreateQuoteBodyDelivery } from '@/shared/api/gen/model';

export const courierAddressSchema = z.object({
  city: z
    .string()
    .min(2, 'Город должен содержать от 2 до 100 символов.')
    .max(100, 'Город должен содержать от 2 до 100 символов.')
    .regex(/\S/, 'Город не должен состоять только из пробелов.'),
  street: z
    .string()
    .min(2, 'Улица должна содержать от 2 до 150 символов.')
    .max(150, 'Улица должна содержать от 2 до 150 символов.')
    .regex(/\S/, 'Улица не должна состоять только из пробелов.'),
  house: z
    .string()
    .min(1, 'Номер дома должен содержать от 1 до 20 символов.')
    .max(20, 'Номер дома должен содержать от 1 до 20 символов.')
    .regex(/\S/, 'Номер дома не должен состоять только из пробелов.'),
  apartment: z.string().max(20, 'Квартира должна содержать не более 20 символов.').optional(),
});

export type CourierAddress = Extract<CreateQuoteBodyDelivery, { method: 'courier' }>['address'];

export function useCheckoutDeliveryCourierForm() {
  const form = useForm<z.infer<typeof courierAddressSchema>>({
    resolver: zodResolver(courierAddressSchema),
    mode: 'onChange',
    defaultValues: {
      city: '',
      street: '',
      house: '',
      apartment: '',
    },
  });

  return { form };
}
