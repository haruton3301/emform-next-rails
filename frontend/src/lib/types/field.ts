export enum FieldType {
  Input = "input",
  Textarea = "textarea",
}

export const FieldTypeLabels: Record<FieldType, string> = {
  [FieldType.Input]: "テキスト",
  [FieldType.Textarea]: "テキストエリア",
}

export interface FieldParams {
  name: string
  label: string
  field_type: FieldType
  is_required: boolean
}

export interface Field {
  id: string
  form_id: string
  name: string
  label: string
  field_type: FieldType
  is_required: boolean
  order: number
}
