"use client"

import { Toaster } from "@/components/ui/sonner"
import { createContext, useContext } from "react"
import { toast } from "sonner"

interface ToastContextType {
  success: (message: string) => void
  error: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const success = (message: string) => {
    toast.success(message)
  }

  const error = (message: string) => {
    toast.error(message)
  }

  return (
    <ToastContext.Provider value={{ success, error }}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)!
