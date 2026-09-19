export const routes = {
  HOME: '/',
  CHECKOUT: '/checkout',
  checkoutQuote: (id: string | number) => `/checkout/${encodeURIComponent(id)}`,
  error: (id: string | number) => `/error/${encodeURIComponent(id)}`,
  ORDERS: '/orders',
  order: (id: string | number) => `/orders/${encodeURIComponent(id)}`,
} as const;
