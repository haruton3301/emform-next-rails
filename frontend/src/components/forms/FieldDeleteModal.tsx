"use client"

import messages from "@/lib/constants/messages"
import { fieldService } from "@/lib/services"
import { Field } from "@/lib/types/field"
import { useToast } from "@/providers/toast"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

type Props = {
  formId: string
  field: Field
  setFields: React.Dispatch<React.SetStateAction<Array<Field>>>
}
export const FieldDeleteModal: React.FC<Props> = ({
  formId,
  field,
  setFields,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await fieldService.deleteField(formId, field.id)

      setFields((prev) => prev.filter((f) => f.id != field.id))
      toast.success(messages.formDeletedMessage)
      setOpen(false)
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      toast.error(messages.commonMessage)
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">削除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>フィールドの削除</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {field.label}({field.name})を削除しますか？
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
