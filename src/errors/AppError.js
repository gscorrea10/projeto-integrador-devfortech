export default class AppError extends Error {
  message;
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
