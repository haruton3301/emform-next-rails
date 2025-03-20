"use client"

import messages from "@/lib/constants/messages"
import { fieldService } from "@/lib/services"
import { Field, FieldType } from "@/lib/types/field"
import { FieldData, fieldSchema } from "@/lib/validations/field"
import { useToast } from "@/providers/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
  setFields: React.Dispatch<React.SetStateAction<Array<Field>>>
}
export const FieldCreateModal: React.FC<Props> = ({ formId, setFields }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const form = useForm<FieldData>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: "",
      label: "",
      field_type: FieldType.Input,
      is_required: false,
    },
  })

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      form.reset()
    }
  }

  const onSubmit: SubmitHandler<FieldData> = async (data) => {
    setIsSubmitting(true)
    try {
      const field = await fieldService.createField(formId, data)

      setFields((prev) => [...prev, field])
      toast.success(messages.fieldCreatedMessage)
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
        <Button variant="outline">新規作成</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>フィールドの新規作成</DialogTitle>
            </DialogHeader>
            <FieldFormFields form={form} />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                作成
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
