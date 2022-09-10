export enum HttpCode {
  OK = 200,
  NEW_CONTENT = 201,
  NO_CONTENT = 204,
  NOT_ALLOWED = 405,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export class AppError extends Error {
  statusCode: HttpCode;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: HttpCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
