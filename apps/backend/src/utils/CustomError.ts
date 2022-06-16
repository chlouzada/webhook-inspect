class CustomError {
  public readonly message?: string | unknown;

  public readonly statusCode: number;

  constructor(message?: string | unknown, statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }

  static badRequest(msg?: string) {
    return new CustomError(msg, 400);
  }

  static internalServerError(msg?: string | unknown) {
    return new CustomError(msg, 500);
  }

  static unauthorized(msg?: string) {
    return new CustomError(msg || "unauthorized", 401);
  }

  static notFound(msg?: string) {
    return new CustomError(msg || "not found", 404);
  }

  static forbidden(msg?: string) {
    return new CustomError(msg || "forbidden", 403);
  }
}

export default CustomError;
