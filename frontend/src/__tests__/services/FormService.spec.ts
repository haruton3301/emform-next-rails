import { InvalidAuthHeadersError } from "@/lib/errors/auth"
import FormService from "@/lib/services/formService"
import {
  removeAuthHeadersFromLocalStorage,
  saveAuthHeadersToLocalStorage,
} from "@/lib/utils/localStorage"
import { mockAuthHeaders } from "@/mocks/data/auth"
import { mockForms } from "@/mocks/data/form"

describe("FormService", () => {
  let formService: FormService

  beforeEach(() => {
    formService = new FormService()
    saveAuthHeadersToLocalStorage(mockAuthHeaders)
  })

  afterEach(() => {
    removeAuthHeadersFromLocalStorage()
  })

  describe("getForms", () => {
    it("should fetch forms successfully", async () => {
      const result = await formService.getForms()
      expect(result).toEqual(mockForms)
    })
  })

  describe("getForm", () => {
    it("should fetch a single form successfully", async () => {
      const result = await formService.getForm("1")
      expect(result).toEqual(mockForms[0])
    })
  })

  describe("createForm", () => {
    it("should create a form successfully", async () => {
      const result = await formService.createForm({
        title: mockForms[0].title,
        description: mockForms[0].description,
      })

      expect(result).toEqual({
        ...mockForms[0],
        id: "4",
      })
    })
  })

  describe("updateForm", () => {
    it("should update a form successfully", async () => {
      const result = await formService.updateForm("1", {
        title: "Updated Title",
        description: "Updated Description",
      })

      expect(result).toEqual({
        ...mockForms[0],
        title: "Updated Title",
        description: "Updated Description",
      })
    })
  })

  describe("deleteForm", () => {
    it("should delete a form successfully", async () => {
      await expect(formService.deleteForm("1")).resolves.toBeUndefined()
    })
  })

  describe("updatePublishStatus", () => {
    it("should update publish status successfully", async () => {
      const result = await formService.updatePublishStatus("2", false)
      expect(result).toEqual({ ...mockForms[0], is_publish: false })
    })
  })

  describe("Auth Error Cases", () => {
    it("should throw InvalidAuthHeadersError when no auth headers are present", async () => {
      removeAuthHeadersFromLocalStorage()

      await expect(
        formService.createForm({
          title: "No Auth",
          description: "Should fail",
        }),
      ).rejects.toThrow(InvalidAuthHeadersError)
    })
  })
})
