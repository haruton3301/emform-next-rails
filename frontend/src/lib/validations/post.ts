import { z } from "zod"
import messages from "../constants/messages"

export const postSchema = z.object({
  title: z.string().nonempty(messages.requiredMessage),
  content: z.string().nonempty(messages.requiredMessage),
})

export type PostData = z.infer<typeof postSchema>
