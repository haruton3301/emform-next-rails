"use client"

import { FieldCreateModal } from "@/components/forms/FieldCreateModal"
import { FieldDeleteModal } from "@/components/forms/FieldDeleteModal"
import { FieldUpdateModal } from "@/components/forms/FieldUpdateModal"
import { Card } from "@/components/ui/card"
import messages from "@/lib/constants/messages"
import { fieldService } from "@/lib/services"
import { Field, FieldTypeLabels } from "@/lib/types/field"
import { useToast } from "@/providers/toast"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { AlignJustify } from "lucide-react"

import { CSS } from "@dnd-kit/utilities"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function FormFieldTab({ id }: { id: string }) {
  const [fields, setFields] = useState<Array<Field>>([])
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const _fields = await fieldService.getFields(id)
        setFields(_fields)
      } catch {
        router.push("/console/forms")
        toast.error(messages.commonMessage)
      }
    }
    fetchForm()
  }, [id, router, toast])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const activeIndex = fields.findIndex(
        (field) => String(field.id) === active.id,
      )
      const overIndex = fields.findIndex(
        (field) => String(field.id) === over?.id,
      )
      if (activeIndex === -1 || overIndex === -1) return

      const updatedFields = [...fields]
      updatedFields.splice(activeIndex, 1)
      updatedFields.splice(overIndex, 0, fields[activeIndex])

      try {
        await fieldService.reorderFields(
          id,
          updatedFields.map((field) => field.id),
        )
        setFields(updatedFields)
        toast.success(messages.fieldReorderedMessage)
      } catch {
        toast.error(messages.commonMessage)
      }
    }
  }

  const SortableItem: React.FC<{ field: Field }> = ({ field }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: field.id.toString(),
      })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <Card
        ref={setNodeRef}
        className="flex flex-row items-center gap-6 rounded-lg px-6 py-4"
        style={style}
      >
        <div className="flex-1 w-full flex items-center gap-4">
          <div className="cursor-grab" {...listeners} {...attributes}>
            <AlignJustify />
          </div>
          <p>{field.name}</p>
          <p>{field.label}</p>
          <p className="text-sm">{FieldTypeLabels[field.field_type]}</p>
          {field.is_required && <p className="text-sm text-slate-600">必須</p>}
        </div>
        <div className="flex items-center gap-3">
          <FieldUpdateModal formId={id} field={field} setFields={setFields} />
          <FieldDeleteModal formId={id} field={field} setFields={setFields} />
        </div>
      </Card>
    )
  }

  if (!fields) {
    return <p>Loading...</p>
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={fields.map((field) => field.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="pb-3 space-y-6">
          <div className="my-3 flex justify-end">
            <FieldCreateModal formId={id} setFields={setFields} />
          </div>
          <div className="space-y-3">
            {fields.map((field) => (
              <SortableItem key={field.id} field={field} />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  )
}
