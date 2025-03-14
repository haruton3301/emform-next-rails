export const mockUser = {
  id: 1,
  email: "user@example.com",
}

export const mockExistingUser = {
  id: 2,
  email: "user2@example.com",
}

export const mockPassword = "password123"

export const mockAuthHeaders = {
  "access-token": "mockAccessToken",
  client: "mockClient",
  expiry: "2025-01-14T12:00:00Z",
  uid: mockUser.email,
}

export const mockInvalidAuthHeader = {
  ...mockAuthHeaders,
  "access-token": "invalid-access-token",
}
