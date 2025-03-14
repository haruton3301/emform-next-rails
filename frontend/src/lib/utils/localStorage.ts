import { AuthHeaders } from "../types/auth"
const AUTH_HEADERS_KEY = "auth_headers"

export const saveAuthHeadersToLocalStorage = (authHeaders: AuthHeaders) => {
  localStorage.setItem(AUTH_HEADERS_KEY, JSON.stringify(authHeaders))
}

export const getAuthHeadersFromLocalStorage = (): AuthHeaders | null => {
  const storedHeaders = localStorage.getItem(AUTH_HEADERS_KEY)
  return storedHeaders ? JSON.parse(storedHeaders) : null
}

export const removeAuthHeadersFromLocalStorage = () => {
  localStorage.removeItem(AUTH_HEADERS_KEY)
}
