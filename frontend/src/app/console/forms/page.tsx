"use client"

import FormDetailPage from "@/page/FormDetailPage"
import FormIndexPage from "@/page/FormIndexPage"
import { useSearchParams } from "next/navigation"

export default function FormsPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  return <>{!!id ? <FormDetailPage id={id} /> : <FormIndexPage />}</>
}
