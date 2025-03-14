import MetaTitle from "@/components/common/MetaTitle"
import { SignUpForm } from "@/components/forms/SignUpForm"

export default function SignUpPage() {
  return (
    <>
      <MetaTitle title="ユーザー登録" />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </>
  )
}
