import { Form } from "@/lib/types/form"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

type Props = {
  forms: Array<Form>
}

export const FormList: React.FC<Props> = ({ forms }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {forms.map((form) => (
        <Link key={form.id} href={`/console/forms/?id=${form.id}`}>
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <CardTitle className="flex-1">{form.title}</CardTitle>
                {form.is_publish ? (
                  <p className="text-sm text-green-600">⚫︎公開中</p>
                ) : (
                  <p className="text-sm text-red-600">⚫︎非公開</p>
                )}
              </div>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
