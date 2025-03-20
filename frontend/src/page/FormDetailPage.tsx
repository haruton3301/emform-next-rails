import { FormTabSwitcher } from "@/components/FormTabSwitcher"
import FormConfigTab from "./FormConfigTab"
import FormFieldTab from "./FormFieldTab"

export default function FormDetailPage({
  id,
  tab,
}: {
  id: string
  tab: string
}) {
  return (
    <>
      <FormTabSwitcher formId={id} currentTab={tab} />
      <div className="w-full max-w-5xl mx-auto pt-14 px-6 md:px-10">
        {tab === "index" && <FormConfigTab id={id} />}
        {tab === "field" && <FormFieldTab id={id} />}
      </div>
    </>
  )
}
