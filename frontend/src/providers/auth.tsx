"use client"

import { authService } from "@/lib/services"
import type { SignInParams, User } from "@/lib/types/auth"
import {
  getAuthHeadersFromLocalStorage,
  removeAuthHeadersFromLocalStorage,
  saveAuthHeadersToLocalStorage,
} from "@/lib/utils/localStorage"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: User | null
  isSignedIn: boolean
  signIn: ({ email, password }: SignInParams) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isSignedIn = !!user

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authHeaders = getAuthHeadersFromLocalStorage()
        if (!authHeaders) {
          throw new Error("AuthHeaders is not stored")
        }
        const _user = await authService.currentUser(authHeaders)
        setUser(_user)
      } catch {
        signOut()
      } finally {
        setIsLoading(false)
      }
    }
    checkAuthStatus()
  }, [])

  const signIn = async ({ email, password }: SignInParams) => {
    const { authHeaders, user: _user } = await authService.signIn({
      email,
      password,
    })
    saveAuthHeadersToLocalStorage(authHeaders)
    setUser(_user)
  }

  const signOut = async () => {
    try {
      const authHeaders = getAuthHeadersFromLocalStorage()
      if (authHeaders) {
        await authService.signOut(authHeaders)
      }
    } catch {
    } finally {
      removeAuthHeadersFromLocalStorage()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isSignedIn, signIn, signOut }}>
      {isLoading ? <p>Loading</p> : <>{children}</>}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
