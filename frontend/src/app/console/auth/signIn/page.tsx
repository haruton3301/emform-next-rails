import MetaTitle from "@/components/common/MetaTitle"
import { SignInForm } from "@/components/forms/SignInForm"

export default function SignUpPage() {
  return (
    <>
      <MetaTitle title="ログイン" />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignInForm />
        </div>
      </div>
    </>
  )
}
