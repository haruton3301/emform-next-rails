import { InvalidAuthHeadersError } from "../errors/auth"
import { CommonError } from "../errors/base"
import { Form, FormParams } from "../types/form"
import { getAuthHeadersFromLocalStorage } from "../utils/localStorage"

import ApiClient from "./apiClient"

class FormService {
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient()
  }

  public async createForm(params: FormParams): Promise<Form> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.post("/v1/forms", params, authHeaders)
    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async updateForm(id: string, params: FormParams): Promise<Form> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.patch(
      `/v1/forms/${id}`,
      params,
      authHeaders,
    )
    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async deleteForm(id: string): Promise<void> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.delete(`/v1/forms/${id}`, authHeaders)
    if (!response.ok) {
      throw new CommonError()
    }
  }

  public async updatePublishStatus(
    id: string,
    isPublish: boolean,
  ): Promise<Form> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.patch(
      `/v1/forms/${id}/update_publish_status`,
      {
        is_publish: isPublish,
      },
      authHeaders,
    )
    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async getForms(): Promise<Form[]> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.get("/v1/forms", authHeaders)
    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async getForm(id: string): Promise<Form> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.get(`/v1/forms/${id}`, authHeaders)
    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }
}

export default FormService
