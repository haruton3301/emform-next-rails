import messages from "../constants/messages"
import { BaseError } from "./base"

export class EmailAlreadyTakenError extends BaseError {
  constructor() {
    super(messages.emailAlreadyTakenMessage)
    this.name = "EmailAlreadyTakenError"
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor() {
    super(messages.invalidCredentialsMessage)
    this.name = "InvalidCredentialsError"
  }
}
