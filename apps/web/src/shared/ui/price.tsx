const formatters: Record<string, Intl.NumberFormat> = {
  RUB: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),
};

export const Price = ({ value, currency = 'RUB' }: { value: number; currency?: string }) => {
  return formatters[currency].format(value / 100) ?? formatters['RUB'].format(value);
};
