"use client"

import messages from "@/lib/constants/messages"
import { InvalidCredentialsError } from "@/lib/errors/auth"
import { SignInData, signInSchema } from "@/lib/validations/auth"
import { useAuth } from "@/providers/auth"
import { useToast } from "@/providers/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

export const SignInForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setIsSubmitting(true)
    try {
      await signIn(data)

      toast.success(messages.signInSuccessfulMessage)
      router.push("/console/forms")
    } catch (error) {
      setIsSubmitting(false)

      if (error instanceof InvalidCredentialsError) {
        toast.error(messages.invalidCredentialsMessage)
      } else {
        toast.error(messages.commonMessage)
        console.error(error)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>パスワード</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                ログイン
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
