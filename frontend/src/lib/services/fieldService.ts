import { InvalidAuthHeadersError } from "../errors/auth"
import { CommonError } from "../errors/base"
import { Field, FieldParams } from "../types/field"
import { getAuthHeadersFromLocalStorage } from "../utils/localStorage"

import ApiClient from "./apiClient"

class FieldService {
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient()
  }

  public async getFields(formId: string): Promise<Field[]> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.get(
      `/v1/forms/${formId}/fields`,
      authHeaders,
    )
    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async createField(
    formId: string,
    params: FieldParams,
  ): Promise<Field> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.post(
      `/v1/forms/${formId}/fields`,
      params,
      authHeaders,
    )

    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async updateField(
    formId: string,
    fieldId: string,
    params: FieldParams,
  ): Promise<Field> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.patch(
      `/v1/forms/${formId}/fields/${fieldId}`,
      params,
      authHeaders,
    )

    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }

  public async deleteField(formId: string, fieldId: string): Promise<void> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.delete(
      `/v1/forms/${formId}/fields/${fieldId}`,
      authHeaders,
    )

    if (!response.ok) {
      throw new CommonError()
    }
  }

  public async reorderFields(
    formId: string,
    fieldIds: string[],
  ): Promise<Field[]> {
    const authHeaders = getAuthHeadersFromLocalStorage()
    if (!authHeaders) {
      throw new InvalidAuthHeadersError()
    }

    const response = await this.apiClient.patch(
      `/v1/forms/${formId}/fields/reorder`,
      { order: fieldIds },
      authHeaders,
    )

    if (!response.ok) {
      throw new CommonError()
    }

    return await response.json()
  }
}

export default FieldService
