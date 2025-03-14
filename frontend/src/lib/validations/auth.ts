import { z } from "zod"
import messages from "../constants/messages"

export const signUpSchema = z.object({
  email: z
    .string({ required_error: messages.requiredMessage })
    .nonempty({ message: messages.requiredMessage })
    .email({ message: messages.emailInvalidFormtMessage }),
  password: z
    .string({ required_error: messages.requiredMessage })
    .nonempty({ message: messages.requiredMessage })
    .min(6, { message: messages.passwordMinimumSizeMessage }),
})

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: messages.requiredMessage })
    .email({ message: messages.emailInvalidFormtMessage }),
  password: z.string().nonempty({ message: messages.requiredMessage }),
})

export type SignUpData = z.infer<typeof signUpSchema>
export type SignInData = z.infer<typeof signInSchema>
