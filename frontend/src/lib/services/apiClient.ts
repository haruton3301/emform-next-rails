export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH"

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
    if (!this.baseUrl) {
      throw new Error(
        "API base URL is not defined. Set NEXT_PUBLIC_API_BASE_URL in your environment variables.",
      )
    }
  }

  private async request(
    endpoint: string,
    method: HttpMethod,
    body?: unknown,
    customHeaders?: Record<string, string>,
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`

    const headers = new Headers(customHeaders)

    if (body && !customHeaders?.["Content-Type"]) {
      headers.set("Content-Type", "application/json")
    }

    const options: RequestInit = {
      method,
      headers,
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)

    return response
  }

  public get(
    endpoint: string,
    customHeaders?: Record<string, string>,
  ): Promise<Response> {
    return this.request(endpoint, "GET", undefined, customHeaders)
  }

  public post(
    endpoint: string,
    body: unknown,
    customHeaders?: Record<string, string>,
  ): Promise<Response> {
    return this.request(endpoint, "POST", body, customHeaders)
  }

  public delete(
    endpoint: string,
    customHeaders?: Record<string, string>,
  ): Promise<Response> {
    return this.request(endpoint, "DELETE", undefined, customHeaders)
  }

  public patch(
    endpoint: string,
    body: unknown,
    customHeaders?: Record<string, string>,
  ): Promise<Response> {
    return this.request(endpoint, "PATCH", body, customHeaders)
  }
}

export default ApiClient
