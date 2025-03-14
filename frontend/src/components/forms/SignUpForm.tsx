"use client"

import messages from "@/lib/constants/messages"
import { EmailAlreadyTakenError } from "@/lib/errors/auth"
import { authService } from "@/lib/services"
import { SignUpData, signUpSchema } from "@/lib/validations/auth"
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

export const SignUpForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    setIsSubmitting(true)
    try {
      await authService.signUp(data)
      await signIn({
        email: data.email,
        password: data.password,
      })

      toast.success(messages.signUpSuccessfulMessage)
      router.push("/")
    } catch (error) {
      setIsSubmitting(false)

      if (error instanceof EmailAlreadyTakenError) {
        toast.error(messages.emailAlreadyTakenMessage)
      } else {
        toast.error(messages.commonMessage)
        console.error(error)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">ユーザー登録</CardTitle>
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
                登録
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
