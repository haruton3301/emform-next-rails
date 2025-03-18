import messages from "@/lib/constants/messages"
import {
  removeAuthHeadersFromLocalStorage,
  saveAuthHeadersToLocalStorage,
} from "@/lib/utils/localStorage"
import { mockAuthHeaders } from "@/mocks/data/auth"
import { mockForms } from "@/mocks/data/form"
import FormIndexPage from "@/page/FormIndexPage"
import { AuthProvider } from "@/providers/auth"
import { ToastProvider } from "@/providers/toast"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { mockedRouterPush } from "../setup"

const renderFormIndexPage = () => {
  render(
    <ToastProvider>
      <AuthProvider>
        <FormIndexPage />
      </AuthProvider>
    </ToastProvider>,
  )
}

describe("FormIndexPage", () => {
  beforeEach(() => {
    saveAuthHeadersToLocalStorage(mockAuthHeaders)
  })

  afterEach(() => {
    removeAuthHeadersFromLocalStorage()
  })

  it("should show forms", async () => {
    renderFormIndexPage()

    await waitFor(() => {
      expect(screen.getByText(mockForms[0].title)).toBeInTheDocument()
      expect(screen.getByText(mockForms[1].title)).toBeInTheDocument()
      expect(screen.getByText(mockForms[2].title)).toBeInTheDocument()
    })
  })

  it("should show error message for missing description", async () => {
    renderFormIndexPage()

    const openButton = await screen.findByRole("button", { name: /新規作成/i })
    fireEvent.click(openButton)

    const submitButton = await screen.findByRole("button", { name: /作成/i })
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: mockForms[0].title },
    })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should create form successfully", async () => {
    renderFormIndexPage()

    const openButton = await screen.findByRole("button", { name: /新規作成/i })
    fireEvent.click(openButton)

    const submitButton = await screen.findByRole("button", { name: /作成/i })
    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: mockForms[0].title },
    })
    fireEvent.change(screen.getByLabelText("説明"), {
      target: { value: mockForms[0].description },
    })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(messages.formCreatedMessage)).toBeInTheDocument(),
    )
    await waitFor(() => {
      expect(mockedRouterPush).toHaveBeenCalledWith(`/console/forms/?id=${4}`)
    })
  })
})
