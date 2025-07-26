class CustomError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Maintains proper stack trace (only available in V8 engines)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
