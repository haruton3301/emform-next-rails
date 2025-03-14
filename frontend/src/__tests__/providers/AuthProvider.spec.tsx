import {
  removeAuthHeadersFromLocalStorage,
  saveAuthHeadersToLocalStorage,
} from "@/lib/utils/localStorage"
import { mockAuthHeaders, mockPassword, mockUser } from "@/mocks/data/auth"
import { AuthProvider, useAuth } from "@/providers/auth"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

type TestComponentProps = {
  email: string
  password: string
}

const TestComponent = ({ email, password }: TestComponentProps) => {
  const { user, isSignedIn, signIn, signOut } = useAuth()

  const handleSignIn = async () => {
    try {
      await signIn({ email, password })
    } catch {
      console.error("SignIn failed")
    }
  }

  return (
    <div>
      <p data-testid="SignIn-status">
        {isSignedIn ? `Logged in as ${user?.email}` : "Not logged in"}
      </p>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

describe("AuthProvider", () => {
  beforeEach(() => {
    removeAuthHeadersFromLocalStorage()
  })

  test("Should initialize as logged out when no token is stored", async () => {
    render(
      <AuthProvider>
        <TestComponent email={mockUser.email} password={mockPassword} />
      </AuthProvider>,
    )

    expect(screen.getByTestId("SignIn-status")).toHaveTextContent(
      "Not logged in",
    )
  })

  test("Should log in successfully with valid credentials", async () => {
    render(
      <AuthProvider>
        <TestComponent email={mockUser.email} password={mockPassword} />
      </AuthProvider>,
    )

    fireEvent.click(screen.getByText("Sign in"))

    await waitFor(() => {
      expect(screen.getByTestId("SignIn-status")).toHaveTextContent(
        `Logged in as ${mockUser.email}`,
      )
    })
  })

  test("Should fail signIn with invalid credentials", async () => {
    const invalidPassword = "invalid-password"

    render(
      <AuthProvider>
        <TestComponent email={mockUser.email} password={invalidPassword} />
      </AuthProvider>,
    )

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    fireEvent.click(screen.getByText("Sign in"))

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("SignIn failed"),
      )
    })
  })

  test("Should auto-SignIn if token is stored", async () => {
    saveAuthHeadersToLocalStorage(mockAuthHeaders)

    render(
      <AuthProvider>
        <TestComponent email="" password="" />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("SignIn-status")).toHaveTextContent(
        `Logged in as ${mockUser.email}`,
      )
    })
  })

  test("Should log out successfully", async () => {
    saveAuthHeadersToLocalStorage(mockAuthHeaders)

    render(
      <AuthProvider>
        <TestComponent email="" password="" />
      </AuthProvider>,
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText("Sign out"))
    })

    await waitFor(() => {
      expect(screen.getByTestId("SignIn-status")).toHaveTextContent(
        "Not logged in",
      )
    })
  })
})
