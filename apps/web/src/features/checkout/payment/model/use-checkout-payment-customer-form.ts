import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CreateOrder200DataCustomer } from '@/shared/api/gen/model';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать от 2 до 100 символов.')
    .max(100, 'Имя должно содержать от 2 до 100 символов.')
    .regex(/\S/, 'Имя не должно состоять только из пробелов.'),
  email: z
    .email('Введите корректный email.')
    .max(150, 'Email должен содержать не более 150 символов.'),
  phone: z.string().regex(/^\+[1-9]\d{9,14}$/, 'Телефон должен быть в формате +79990000000.'),
});

export function useCheckoutPaymentCustomerForm(
  onSubmit: (data: CreateOrder200DataCustomer) => void,
) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const submit = form.handleSubmit(onSubmit);

  return { form, submit };
}
