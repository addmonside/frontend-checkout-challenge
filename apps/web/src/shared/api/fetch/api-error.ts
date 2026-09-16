import type { ApiFieldError } from './api-error-types';

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId?: string;
  readonly fields: ApiFieldError[];

  constructor(
    status: number,
    code: string,
    message: string,
    fields: ApiFieldError[] = [],
    requestId?: string,
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
    this.requestId = requestId;
  }

  /** true, если это ошибка валидации формы */
  get isValidation() {
    return this.code === 'VALIDATION_ERROR' && this.fields.length > 0;
  }

  /**
   * "body/customer/email" -> "customer.email" — под react-hook-form setError.
   * Считаем один раз при обращении, не на каждый рендер компонента.
   */
  toFieldErrorMap(): Record<string, string> {
    return this.fields.reduce<Record<string, string>>((acc, f) => {
      const key = f.path.replace(/^body\//, '').replace(/\//g, '.');
      acc[key] = f.message;
      return acc;
    }, {});
  }
}

export class NetworkError extends Error {}
