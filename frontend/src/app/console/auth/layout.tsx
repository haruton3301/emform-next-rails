"use client"
import { useAuth } from "@/providers/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push("/console/forms")
    }
  }, [isSignedIn, router])

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-6 md:px-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
