type Code =
  | 'VALIDATION_ERROR'
  | 'INVALID_REQUEST'
  | 'REQUEST_BODY_NOT_ALLOWED'
  | 'SESSION_REQUIRED'
  | 'SESSION_INVALID'
  | 'SESSION_NOT_FOUND'
  | 'CART_ITEM_NOT_FOUND'
  | 'PRODUCT_NOT_FOUND'
  | 'QUOTE_NOT_FOUND'
  | 'ORDER_NOT_FOUND'
  | 'INSUFFICIENT_STOCK'
  | 'CART_VERSION_CONFLICT'
  | 'QUOTE_EXPIRED'
  | 'CART_VERSION_CONFLICT'
  | 'IDEMPOTENCY_CONFLICT'
  | 'PRECONDITION_FAILED'
  | 'PAYLOAD_TOO_LARGE'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'UNSUPPORTED_CONTENT_ENCODING'
  | 'CART_EMPTY'
  | 'INTERNAL_ERROR'
  | 'PAYMENT_NOT_REQUIRED'
  | 'ORDER_ALREADY_PAID'
  | 'PAYMENT_IN_PROGRESS'
  | string;

export interface ApiFieldError {
  path: string;
  message: string;
}

export interface ApiErrorBody {
  error: {
    code: Code;
    message: string;
    fields?: ApiFieldError[];
  };
  meta?: { requestId?: string };
}
