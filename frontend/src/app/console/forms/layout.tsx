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

  return (
    <div className="min-h-svh w-full max-w-5xl mx-auto pt-14 px-6 md:px-10">
      {children}
    </div>
  )
}
