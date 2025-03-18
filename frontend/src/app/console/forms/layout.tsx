"use client"
import { useAuth } from "@/providers/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/console/auth/signIn")
    }
  }, [isSignedIn, router])

  return children
}
