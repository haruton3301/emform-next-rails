import { cn } from "@/lib/utils/style"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

type Props = {
  formId: string
  currentTab: string
}

export const FormTabSwitcher: React.FC<Props> = ({ formId, currentTab }) => {
  const tabs = [
    {
      label: "設定",
      to: "index",
    },
    {
      label: "フィールド",
      to: "field",
    },
    {
      label: "回答",
      to: "answer",
    },
  ]

  return (
    <>
      <div className="fixed top-14 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={cn(
                "h-12 flex items-center",
                currentTab === tab.to ? "border-b-2 border-primary" : "",
              )}
            >
              <Link
                href={`/console/forms/?id=${formId}&tab=${tab.to}`}
                className={cn(buttonVariants({ variant: "ghost" }), "min-w-20")}
              >
                {tab.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="h-12"></div>
    </>
  )
}
