import messages from "@/lib/constants/messages"
import {
  removeAuthHeadersFromLocalStorage,
  saveAuthHeadersToLocalStorage,
} from "@/lib/utils/localStorage"
import { mockAuthHeaders } from "@/mocks/data/auth"
import { mockForms } from "@/mocks/data/form"
import FormConfigTab from "@/page/FormConfigTab"
import { AuthProvider } from "@/providers/auth"
import { ToastProvider } from "@/providers/toast"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { mockedRouterPush } from "../setup"

const renderFormConfigTab = () => {
  render(
    <ToastProvider>
      <AuthProvider>
        <FormConfigTab id={mockForms[0].id} />
      </AuthProvider>
    </ToastProvider>,
  )
}

describe("FormConfigTab", () => {
  beforeEach(() => {
    saveAuthHeadersToLocalStorage(mockAuthHeaders)
  })

  afterEach(() => {
    removeAuthHeadersFromLocalStorage()
  })

  it("should show error message for missing description", async () => {
    renderFormConfigTab()

    const openButton = await screen.findByRole("button", { name: /編集/i })
    fireEvent.click(openButton)

    const submitButton = await screen.findByRole("button", { name: /更新/i })
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: mockForms[0].title },
    })
    fireEvent.change(screen.getByLabelText("説明"), {
      target: { value: "" },
    })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should update form successfully", async () => {
    renderFormConfigTab()

    const openButton = await screen.findByRole("button", { name: /編集/i })
    fireEvent.click(openButton)

    const submitButton = await screen.findByRole("button", { name: /更新/i })
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: mockForms[0].title },
    })
    fireEvent.change(screen.getByLabelText("説明"), {
      target: { value: mockForms[0].description },
    })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(messages.formUpdatedMessage)).toBeInTheDocument(),
    )
  })

  it("should update publish status successfully", async () => {
    renderFormConfigTab()

    const button = await screen.findByRole("switch")
    fireEvent.click(button)

    await waitFor(() =>
      expect(
        screen.getByText(messages.formPublishUpdatedMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should delete form successfully", async () => {
    renderFormConfigTab()

    const openButton = await screen.findByRole("button", { name: /削除/i })
    fireEvent.click(openButton)

    const submitButton = await screen.findByRole("button", { name: /削除/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(messages.formDeletedMessage)).toBeInTheDocument(),
    )
    await waitFor(() => {
      expect(mockedRouterPush).toHaveBeenCalledWith("/console/forms")
    })
  })
})
