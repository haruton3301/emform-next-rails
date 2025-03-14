import {
  EmailAlreadyTakenError,
  InvalidCredentialsError,
} from "@/lib/errors/auth"
import AuthService from "@/lib/services/authService"
import {
  mockAuthHeaders,
  mockInvalidAuthHeader,
  mockPassword,
  mockUser,
} from "@/mocks/data/auth"

describe("AuthService", () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
  })

  describe("signUp", () => {
    it("should handle successful sign up", async () => {
      const response = await authService.signUp({
        email: "newuser@example.com",
        password: mockPassword,
      })
      expect(response).toBeUndefined()
    })

    it("should handle email already taken error", async () => {
      await expect(
        authService.signUp({
          email: mockUser.email,
          password: mockPassword,
        }),
      ).rejects.toThrow(EmailAlreadyTakenError)
    })
  })

  describe("signIn", () => {
    it("should handle successful sign in", async () => {
      const { authHeaders, user } = await authService.signIn({
        email: mockUser.email,
        password: mockPassword,
      })
      expect(user).toEqual(mockUser)
      expect(authHeaders).toEqual(mockAuthHeaders)
    })

    it("should handle invalid credentials error", async () => {
      await expect(
        authService.signIn({
          email: mockUser.email,
          password: "InvalidPassword",
        }),
      ).rejects.toThrow(InvalidCredentialsError)
    })
  })

  describe("signOut", () => {
    it("should handle successful sign out", async () => {
      await authService.signOut(mockAuthHeaders)
    })

    it("should handle unauthorized sign out", async () => {
      await expect(authService.signOut(mockInvalidAuthHeader)).rejects.toThrow()
    })
  })

  describe("currentUser", () => {
    it("should successfully retrieve the current user", async () => {
      await authService.currentUser(mockAuthHeaders)
    })

    it("should return unauthorized when token is invalid", async () => {
      await expect(
        authService.currentUser(mockInvalidAuthHeader),
      ).rejects.toThrow()
    })
  })
})
