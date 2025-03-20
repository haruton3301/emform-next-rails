import { z } from "zod"
import messages from "../constants/messages"
import { FieldType } from "../types/field"

export const fieldSchema = z.object({
  name: z
    .string()
    .nonempty(messages.requiredMessage)
    .max(255, messages.maxLengthMessage(255))
    .regex(/^[a-zA-Z0-9]+$/, messages.onlyEnglishMessage),
  label: z
    .string()
    .nonempty(messages.requiredMessage)
    .max(255, messages.maxLengthMessage(255)),
  field_type: z
    .nativeEnum(FieldType)
    .refine(
      (value) => value === FieldType.Input || value === FieldType.Textarea,
      {
        message: messages.invalidMessage,
      },
    ),
  is_required: z.boolean(),
})

export type FieldData = z.infer<typeof fieldSchema>
