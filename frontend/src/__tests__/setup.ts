import "@testing-library/jest-dom"
import { afterAll, afterEach, beforeAll } from "vitest"
import { server } from "../mocks/setup/server"

export const mockedRouterPush = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockedRouterPush,
  }),
}))

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

beforeAll(() => {
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
