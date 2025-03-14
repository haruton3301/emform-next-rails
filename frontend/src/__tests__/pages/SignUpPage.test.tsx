import SignUpPage from "@/app/console/auth/signUp/page"
import messages from "@/lib/constants/messages"
import { mockExistingUser, mockPassword, mockUser } from "@/mocks/data/auth"
import { AuthProvider } from "@/providers/auth"
import { ToastProvider } from "@/providers/toast"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { mockedRouterPush } from "../setup"

const renderSignUpPage = () => {
  render(
    <ToastProvider>
      <AuthProvider>
        <SignUpPage />
      </AuthProvider>
    </ToastProvider>,
  )
}

describe("SignUpPage", () => {
  it("should show error message for already taken email", async () => {
    renderSignUpPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: mockExistingUser.email },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.emailAlreadyTakenMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing email", async () => {
    renderSignUpPage()

    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message for invalid email format", async () => {
    const invalidEmail = "invalid@email"

    renderSignUpPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: invalidEmail },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.emailInvalidFormtMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing password", async () => {
    renderSignUpPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: mockUser.email },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should register successfully", async () => {
    renderSignUpPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: mockUser.email },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.signUpSuccessfulMessage),
      ).toBeInTheDocument(),
    )
    await waitFor(() => {
      expect(mockedRouterPush).toHaveBeenCalledWith("/console/forms")
    })
  })
})
