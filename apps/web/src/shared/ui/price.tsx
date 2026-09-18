import { appConfig } from '../model/app-config';

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

export const Price = ({
  value,
  currency = appConfig.DEFAULT_CURRENCY,
  zeroTitle = 'Бесплатно',
}: {
  value: number;
  currency?: string;
  zeroTitle?: string;
}) => {
  return !!value
    ? (formatters[currency].format(value / 100) ??
        formatters[appConfig.DEFAULT_CURRENCY].format(value))
    : zeroTitle;
};
