"use client"

import messages from "@/lib/constants/messages"
import { fieldService } from "@/lib/services"
import { Field } from "@/lib/types/field"
import { FieldData, fieldSchema } from "@/lib/validations/field"
import { useToast } from "@/providers/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Form } from "../ui/form"
import { FieldFormFields } from "./FieldFormFields"

type Props = {
  formId: string
  field: Field
  setFields: React.Dispatch<React.SetStateAction<Array<Field>>>
}
export const FieldUpdateModal: React.FC<Props> = ({
  formId,
  field,
  setFields,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const form = useForm<FieldData>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: field.name,
      label: field.label,
      field_type: field.field_type,
      is_required: field.is_required,
    },
  })

  useEffect(() => {
    form.reset({
      name: field.name,
      label: field.label,
      field_type: field.field_type,
      is_required: field.is_required,
    })
  }, [field, form])

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      form.reset()
    }
  }

  const onSubmit: SubmitHandler<FieldData> = async (data) => {
    setIsSubmitting(true)
    try {
      const _field = await fieldService.updateField(formId, field.id, data)

      setFields((prev) => prev.map((f) => (f.id === _field.id ? _field : f)))
      toast.success(messages.fieldUpdatedMessage)
      setOpen(false)
      setIsSubmitting(false)
      form.reset()
    } catch (error) {
      setIsSubmitting(false)
      toast.error(messages.commonMessage)
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>フィールドの編集</DialogTitle>
            </DialogHeader>
            <FieldFormFields form={form} />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                更新
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
