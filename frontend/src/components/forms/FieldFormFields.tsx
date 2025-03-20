import { FieldType, FieldTypeLabels } from "@/lib/types/field"
import { FieldData } from "@/lib/validations/field"
import { UseFormReturn } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type Props = {
  form: UseFormReturn<FieldData>
}

export const FieldFormFields: React.FC<Props> = ({ form }) => {
  return (
    <div className="grid gap-4 py-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="inline-block text-right">識別名</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="inline-block text-right">ラベル</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="field_type"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="inline-block text-right">タイプ</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={String(field.value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FieldType).map(([, value]) => (
                      <SelectItem key={value} value={String(value)}>
                        {FieldTypeLabels[value as FieldType]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="is_required"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2 ml-12">
            <Checkbox
              id="is_required"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FormLabel htmlFor="is_required">必須</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
