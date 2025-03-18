import { FormDeleteModal } from "@/components/forms/FormDeleteModal"
import { FormPublishSwitcher } from "@/components/forms/FormPublishSwitcher"
import { FormUpdateModal } from "@/components/forms/FormUpdateModal"
import { Card } from "@/components/ui/card"
import { formService } from "@/lib/services"
import { Form } from "@/lib/types/form"
import { useEffect, useState } from "react"

export default function FormConfigTab({ id }: { id: string }) {
  const [form, setForm] = useState<Form>()

  useEffect(() => {
    const fetchForm = async () => {
      const _form = await formService.getForm(id)
      setForm(_form)
      console.log(_form)
    }
    fetchForm()
  }, [id])

  if (!form) {
    return <p>Loading...</p>
  }

  return (
    <div className="py-6 space-y-6">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h2 className="flex-1 text-xl font-semibold px-2">基本設定</h2>
          <FormUpdateModal _form={form} setForm={setForm} />
        </div>
        <Card className="rounded-md p-6">
          <ul className="space-y-3.5">
            <li>
              <p className="text-slate-500">名前</p>
              <span>{form.title}</span>
            </li>
            <li>
              <p className="text-slate-500">説明</p>
              <span>{form.description}</span>
            </li>
          </ul>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 px-2">公開設定</h2>
        <Card className="rounded-md p-6">
          <ul className="space-y-3.5">
            <li className="flex items-center gap-4">
              <FormPublishSwitcher form={form} setForm={setForm} />
              <p className="text-slate-500">
                {form.is_publish ? "公開" : "非公開"}
              </p>
            </li>
          </ul>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 px-2">削除設定</h2>
        <Card className="rounded-md py-4 px-6">
          <div className="flex items-center">
            <FormDeleteModal id={form.id} />
          </div>
        </Card>
      </div>
    </div>
  )
}
