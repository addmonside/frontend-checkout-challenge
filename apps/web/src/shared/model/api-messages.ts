import { ApiError } from '@/shared/api';

export const DEFAULT_MESSAGES: Record<string, string> = {
  // Валидация / формат запроса
  VALIDATION_ERROR: 'Проверьте правильность заполнения полей',
  INVALID_REQUEST: 'Некорректный запрос',
  REQUEST_BODY_NOT_ALLOWED: 'Некорректный запрос',
  PAYLOAD_TOO_LARGE: 'Запрос слишком большой',
  UNSUPPORTED_MEDIA_TYPE: 'Неподдерживаемый формат данных',
  UNSUPPORTED_CONTENT_ENCODING: 'Неподдерживаемое сжатие данных',

  // Сессия / авторизация
  SESSION_REQUIRED: 'Нужно войти в аккаунт',
  SESSION_INVALID: 'Сессия истекла, войдите снова',
  SESSION_NOT_FOUND: 'Сессия не найдена, войдите снова',

  // Корзина / товары / заказ
  CART_ITEM_NOT_FOUND: 'Товар не найден в корзине',
  CART_EMPTY: 'Корзина пуста',
  CART_VERSION_CONFLICT: 'Корзина была изменена в другом месте, обновите страницу',
  PRODUCT_NOT_FOUND: 'Товар не найден или снят с продажи',
  INSUFFICIENT_STOCK: 'Недостаточно товара на складе',
  QUOTE_NOT_FOUND: 'Расчёт стоимости не найден',
  QUOTE_EXPIRED: 'Расчёт стоимости устарел, обновите страницу',
  ORDER_NOT_FOUND: 'Заказ не найден',

  // Оплата
  PAYMENT_NOT_REQUIRED: 'Оплата для этого заказа не требуется',
  ORDER_ALREADY_PAID: 'Заказ уже оплачен',
  PAYMENT_IN_PROGRESS: 'Платёж уже обрабатывается, подождите',

  // Конкурентность / идемпотентность
  IDEMPOTENCY_CONFLICT: 'Повторный запрос с другими данными, обновите страницу',
  PRECONDITION_FAILED: 'Данные устарели, обновите страницу и попробуйте снова',

  // Сервер
  INTERNAL_ERROR: 'Что-то пошло не так на сервере, попробуйте позже',
};

export function humanizeApiError(
  error: ApiError,
  overrides?: Partial<Record<string, string>>,
): string {
  return overrides?.[error.code] ?? DEFAULT_MESSAGES[error.code] ?? error.message;
}

export type ErrorPresentation = { title?: string; description: string };

export function humanizeErrorPresentation(error: ApiError): ErrorPresentation {
  switch (error.code) {
    case 'QUOTE_EXPIRED':
      return {
        title: 'Расчёт устарел',
        description: 'Рассчитайте доставку заново, чтобы создать заказ.',
      };
    case 'QUOTE_NOT_FOUND':
      return {
        title: 'Расчёт не найден',
        description: 'Пересчитайте доставку, чтобы продолжить оформление.',
      };
    case 'CART_VERSION_CONFLICT':
      return { title: 'Корзина изменилась', description: 'Обновите её и повторите действие.' };
    case 'PRECONDITION_FAILED':
      return { title: 'Данные изменились', description: 'Обновите страницу и попробуйте снова.' };
    default:
      return { description: error.message };
  }
}
