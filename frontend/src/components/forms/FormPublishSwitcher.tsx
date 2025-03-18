import messages from "@/lib/constants/messages"
import { formService } from "@/lib/services"
import { Form } from "@/lib/types/form"
import { useToast } from "@/providers/toast"
import { useState } from "react"
import { Switch } from "../ui/switch"

type Props = {
  form: Form
  setForm: (_form: Form) => void
}
export const FormPublishSwitcher: React.FC<Props> = ({ form, setForm }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const toast = useToast()

  const handleChange = async () => {
    setIsSubmitting(true)

    try {
      const _form = await formService.updatePublishStatus(
        form.id,
        !form.is_publish,
      )
      setForm(_form)

      toast.success(messages.formPublishUpdatedMessage)
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      toast.error(messages.commonMessage)
      console.error(error)
    }
  }

  return (
    <Switch
      checked={form.is_publish}
      onCheckedChange={handleChange}
      disabled={isSubmitting}
      className="cursor-pointer"
    />
  )
}
