"use client"

import messages from "@/lib/constants/messages"
import site from "@/lib/constants/site"
import { useAuth } from "@/providers/auth"
import { useToast } from "@/providers/toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const Header: React.FC = () => {
  const { signOut, isSignedIn } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const handleSignOut = async () => {
    await signOut()
    toast.success(messages.signOutSuccessfulMessage)
    router.push("/console/auth/signIn")
  }

  return (
    <header className="border-grid fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper flex justify-center">
        <div className="container px-4 md:px-6 flex h-14 items-center gap-2 md:gap-4">
          <div className="flex-1 flex">
            <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <span className="font-bold inline-block">{site.title}</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              {isSignedIn && (
                <Link
                  href="/console/forms"
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  フォーム一覧
                </Link>
              )}
            </nav>
          </div>
          <div className="flex gap-2">
            {isSignedIn ? (
              <Button onClick={handleSignOut}>ログアウト</Button>
            ) : (
              <>
                <Button asChild>
                  <Link href="/console/auth/signUp">ユーザー登録</Link>
                </Button>
                <Button asChild>
                  <Link href="/console/auth/signIn">ログイン</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
