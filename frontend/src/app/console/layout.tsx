import { AuthProvider } from "@/providers/auth"
import { ToastProvider } from "@/providers/toast"

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  )
}
