import BaseError from "./BaseError";

export default class UnprocessableEntityError extends BaseError {
  constructor(message: string) {
    super(422, message);
  }
}