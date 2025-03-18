import { http, HttpResponse, RequestHandler } from "msw"
import { mockForms } from "../data/form"

export const createFormHandlers = (mockEndPoint: string): RequestHandler[] => {
  return [
    http.post(`${mockEndPoint}/v1/forms`, async ({ request }) => {
      const body = await request.json()
      const { title, description } = body as {
        title: string
        description: string
      }

      if (!title || !description) {
        return HttpResponse.json(
          { errors: ["Title and description are required"] },
          { status: 400 },
        )
      }

      const newForm = {
        id: (mockForms.length + 1).toString(),
        title,
        description,
        is_publish: true,
      }

      mockForms.push(newForm)

      return HttpResponse.json(newForm, { status: 201 })
    }),

    http.get(`${mockEndPoint}/v1/forms`, async () => {
      return HttpResponse.json(mockForms, { status: 200 })
    }),

    http.get(`${mockEndPoint}/v1/forms/:formId`, async ({ params }) => {
      const { formId } = params

      const form = mockForms.find((f) => f.id === formId)

      if (form) {
        return HttpResponse.json(form, { status: 200 })
      }

      return HttpResponse.json({ errors: ["Form not found"] }, { status: 404 })
    }),

    http.patch(
      `${mockEndPoint}/v1/forms/:formId`,
      async ({ params, request }) => {
        const { formId } = params
        const body = await request.json()
        const { title, description } = body as {
          title?: string
          description?: string
        }

        const formIndex = mockForms.findIndex((f) => f.id === formId)

        if (formIndex !== -1) {
          mockForms[formIndex] = {
            ...mockForms[formIndex],
            title: title ?? mockForms[formIndex].title,
            description: description ?? mockForms[formIndex].description,
          }

          return HttpResponse.json(mockForms[formIndex], { status: 200 })
        }

        return HttpResponse.json(
          { errors: ["Form not found"] },
          { status: 404 },
        )
      },
    ),

    http.patch(
      `${mockEndPoint}/v1/forms/:formId/update_publish_status`,
      async ({ params, request }) => {
        const { formId } = params
        const body = await request.json()
        const { is_publish } = body as { is_publish: boolean }

        const formIndex = mockForms.findIndex((f) => f.id === formId)

        if (formIndex !== -1) {
          mockForms[formIndex] = {
            ...mockForms[formIndex],
            is_publish,
          }

          return HttpResponse.json(mockForms[formIndex], { status: 200 })
        }

        return HttpResponse.json(
          { errors: ["Form not found"] },
          { status: 404 },
        )
      },
    ),

    http.delete(`${mockEndPoint}/v1/forms/:formId`, async ({ params }) => {
      const { formId } = params

      const formIndex = mockForms.findIndex((f) => f.id === formId)

      if (formIndex !== -1) {
        mockForms.splice(formIndex, 1)

        return HttpResponse.text(null, { status: 204 })
      }

      return HttpResponse.json({ errors: ["Form not found"] }, { status: 404 })
    }),
  ]
}
