"use client"

import FormDetailPage from "@/page/FormDetailPage"
import FormIndexPage from "@/page/FormIndexPage"
import { useSearchParams } from "next/navigation"

export default function FormsPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const tab = searchParams.get("tab") || "index"

  return <>{!!id ? <FormDetailPage id={id} tab={tab} /> : <FormIndexPage />}</>
}
