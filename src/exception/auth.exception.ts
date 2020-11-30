export class LoginInfoError extends Error {
  constructor() {
    super(`login info is wrong.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, LoginInfoError.prototype);
  }
}

export class UserNotExistError extends Error {
  constructor() {
    super(`User does not exist.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }
}
