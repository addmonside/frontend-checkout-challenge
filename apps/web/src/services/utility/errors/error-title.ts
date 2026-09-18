const ERROR_TITLES: Record<string, string> = {
  // HTTP-статусы
  '400': 'Некорректный запрос',
  '401': 'Требуется авторизация',
  '403': 'Доступ запрещён',
  '404': 'Ресурс не найден',
  '409': 'Конфликт данных',
  '422': 'Проверьте данные',
  '429': 'Слишком много запросов',
  '500': 'Ошибка сервера',
  '503': 'Сервис недоступен',

  // Коды ошибок API
  VALIDATION_ERROR: 'Проверьте данные',
  INVALID_REQUEST: 'Некорректный запрос',
  PAYLOAD_TOO_LARGE: 'Запрос слишком большой',
  SESSION_REQUIRED: 'Нужно войти в аккаунт',
  SESSION_INVALID: 'Сессия истекла',
  SESSION_NOT_FOUND: 'Сессия не найдена',
  CART_ITEM_NOT_FOUND: 'Товар не найден в корзине',
  CART_EMPTY: 'Корзина пуста',
  CART_VERSION_CONFLICT: 'Корзина изменилась',
  PRODUCT_NOT_FOUND: 'Товар не найден',
  INSUFFICIENT_STOCK: 'Недостаточно товара',
  QUOTE_NOT_FOUND: 'Расчёт не найден',
  QUOTE_EXPIRED: 'Расчёт устарел',
  ORDER_NOT_FOUND: 'Заказ не найден',
  PAYMENT_IN_PROGRESS: 'Платёж обрабатывается',
  IDEMPOTENCY_CONFLICT: 'Повторный запрос',
  PRECONDITION_FAILED: 'Данные устарели',
  INTERNAL_ERROR: 'Ошибка сервера',
};

export function errorTitle(id: string): string {
  return ERROR_TITLES[id] ?? 'Произошла ошибка';
}
