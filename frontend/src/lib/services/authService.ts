import {
  EmailAlreadyTakenError,
  InvalidAuthHeadersError,
  InvalidCredentialsError,
} from "../errors/auth"
import { CommonError } from "../errors/base"
import { AuthHeaders, SignInParams, SignUpParams, User } from "../types/auth"
import { extractAuthHeaders, extractUser } from "../utils/auth"
import ApiClient from "./apiClient"

class AuthService {
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient()
  }

  private validateAuthHeaders(authHeaders: AuthHeaders): void {
    const requiredKeys = ["access-token", "client", "expiry", "uid"]
    for (const key of requiredKeys) {
      if (!authHeaders[key]) {
        throw new InvalidAuthHeadersError()
      }
    }
  }

  public async signUp(params: SignUpParams): Promise<void> {
    const response = await this.apiClient.post("/v1/auth", params)
    if (!response.ok) {
      const error = await response.json()

      if (error.errors.email[0] === "has already been taken") {
        throw new EmailAlreadyTakenError()
      } else {
        throw new CommonError()
      }
    }
  }

  public async signIn(
    params: SignInParams,
  ): Promise<{ authHeaders: AuthHeaders; user: User }> {
    const response = await this.apiClient.post("/v1/auth/sign_in", params)
    if (!response.ok) {
      const error = await response.json()

      if (
        error.errors?.[0] === "Invalid login credentials. Please try again."
      ) {
        throw new InvalidCredentialsError()
      } else {
        throw new CommonError()
      }
    }

    try {
      const authHeaders = extractAuthHeaders(response)
      const user = await extractUser(response)

      return { authHeaders, user }
    } catch {
      throw new CommonError()
    }
  }

  public async signOut(authHeaders: AuthHeaders): Promise<void> {
    this.validateAuthHeaders(authHeaders)
    try {
      const response = await this.apiClient.delete(
        "/v1/auth/sign_out",
        authHeaders,
      )

      if (!response.ok) {
        throw new CommonError()
      }
    } catch {
      throw new CommonError()
    }
  }

  public async currentUser(authHeaders: AuthHeaders): Promise<User> {
    this.validateAuthHeaders(authHeaders)
    try {
      const response = await this.apiClient.get(
        "/v1/auth/validate_token",
        authHeaders,
      )

      if (!response.ok) {
        throw new CommonError()
      }

      return await extractUser(response)
    } catch {
      throw new CommonError()
    }
  }
}

export default AuthService
