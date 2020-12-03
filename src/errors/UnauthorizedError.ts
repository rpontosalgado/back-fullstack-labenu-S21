import BaseError from "./BaseError";

export default class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(401, message);
  }
}