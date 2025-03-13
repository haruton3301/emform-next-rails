import messages from "../constants/messages"
import { BaseError } from "./base"

export class ReportNotFoundError extends BaseError {
  constructor() {
    super(messages.reportNotFoundMessage)
    this.name = "ReportNotFoundError"
  }
}
