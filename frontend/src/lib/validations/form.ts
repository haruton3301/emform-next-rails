import { z } from "zod"
import messages from "../constants/messages"

export const formSchema = z.object({
  title: z
    .string()
    .nonempty(messages.requiredMessage)
    .max(255, messages.maxLengthMessage(255)),
  description: z.string().nonempty(messages.requiredMessage),
})

export type FormData = z.infer<typeof formSchema>
