import { type RequestHandler } from "msw"
import { createAuthHandlers } from "./auth"

export const mockEndPoint = process.env.NEXT_PUBLIC_API_BASE_URL || ""

export const handlers: RequestHandler[] = [...createAuthHandlers(mockEndPoint)]
