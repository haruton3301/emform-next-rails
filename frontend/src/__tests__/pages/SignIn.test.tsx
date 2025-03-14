import SignInPage from "@/app/console/auth/signIn/page"
import messages from "@/lib/constants/messages"
import { mockPassword, mockUser } from "@/mocks/data/auth"
import { AuthProvider } from "@/providers/auth"
import { ToastProvider } from "@/providers/toast"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { mockedRouterPush } from "../setup"

const renderSignInPage = () => {
  render(
    <ToastProvider>
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    </ToastProvider>,
  )
}

describe("SignInPage", () => {
  it("should show error message for invalid credentials", async () => {
    const incorrectPassword = "invalid-password"
    renderSignInPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: mockUser.email },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: incorrectPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.invalidCredentialsMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing email", async () => {
    renderSignInPage()

    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message for invalid email format", async () => {
    const invalidEmail = "invalid@email"
    renderSignInPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: invalidEmail },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.emailInvalidFormtMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing password", async () => {
    renderSignInPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: mockUser.email },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should SignIn successfully", async () => {
    renderSignInPage()

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: mockUser.email },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: mockPassword },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.signInSuccessfulMessage),
      ).toBeInTheDocument(),
    )
    await waitFor(() => {
      expect(mockedRouterPush).toHaveBeenCalledWith("/console/forms")
    })
  })
})
