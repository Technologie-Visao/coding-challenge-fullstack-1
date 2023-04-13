/**
 * CustomError class that extends the built-in Error class.
 * This class allows adding a statusCode property to the error, which can be used for handling HTTP error codes.
 * It also provides a method to serialize the error message.
 */
export class CustomError extends Error {
  /**
   * The HTTP status code associated with this error.
   */
  statusCode: number;

  /**
   * Constructs a new CustomError instance.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with this error.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * Serializes the error message into an object.
   * @returns {{message: string}} An object containing the error message.
   */
  serializeErrors(): { message: string } {
    return { message: this.message };
  }
}
