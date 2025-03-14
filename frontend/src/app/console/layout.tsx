import { Header } from "@/components/layout/Header"
import { AuthProvider } from "@/providers/auth"
import { ToastProvider } from "@/providers/toast"

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </ToastProvider>
  )
}
