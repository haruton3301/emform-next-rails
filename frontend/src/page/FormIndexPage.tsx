"use client"

import { FormCreateModal } from "@/components/forms/FormCreateModal"
import { FormList } from "@/components/list/FormList"
import { formService } from "@/lib/services"
import { Form } from "@/lib/types/form"
import { useEffect, useState } from "react"

export default function FormIndexPage() {
  const [forms, setForms] = useState<Array<Form>>([])

  useEffect(() => {
    const fetchForms = async () => {
      const _forms = await formService.getForms()
      setForms(_forms)
    }
    fetchForms()
  }, [])

  return (
    <div className="min-h-svh w-full max-w-5xl mx-auto pt-14 px-6 md:px-10">
      <div className="my-3 flex justify-end">
        <FormCreateModal />
      </div>
      <FormList forms={forms} />
    </div>
  )
}
