"use client"

import messages from "@/lib/constants/messages"
import { formService } from "@/lib/services"
import { useToast } from "@/providers/toast"
import { useRouter } from "next/navigation"
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
  id: string
}
export const FormDeleteModal: React.FC<Props> = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const toast = useToast()

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await formService.deleteForm(id)

      toast.success(messages.formDeletedMessage)
      router.push(`/console/forms`)
    } catch (error) {
      setIsSubmitting(false)
      toast.error(messages.commonMessage)
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">削除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>フォームの削除</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">フォームを削除しますか？</div>
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
