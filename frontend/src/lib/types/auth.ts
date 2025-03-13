export interface SignUpParams {
  email: string
  password: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
}

export interface AuthHeaders {
  accessToken: string
  client: string
  expiry: string
  uid: string
}
