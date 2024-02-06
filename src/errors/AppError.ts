class AppError {
  public statusCode;

  public message;

  constructor(message: string, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;
