require 'rails_helper'

RSpec.describe "V1::Fields", type: :request do
  let(:user) { create(:user) }
  let(:form) { create(:form, user: user) }
  let(:auth_headers) { user.create_new_auth_token }

  let(:valid_attributes) do
    {
      name: "Test Field",
      label: "Test Label",
      field_type: :input,
      is_required: true
    }
  end

  let(:invalid_attributes) do
    {
      name: "",
      label: "",
      field_type: nil,
      is_required: nil
    }
  end

  describe "GET /v1/forms/:form_id/fields" do
    let!(:form) { create(:form, user: user) }
    let!(:field1) { create(:field, form: form, order: 0) }
    let!(:field2) { create(:field, form: form, order: 1) }
    let!(:field3) { create(:field, form: form, order: 2) }

    it "returns a list of fields for the given form" do
      get v1_form_fields_path(form_id: form.id), headers: auth_headers

      expect(response).to have_http_status(:ok)
      expect(json.length).to eq(3)
      expect(json[0]['id']).to eq(field1.id)
      expect(json[1]['id']).to eq(field2.id)
      expect(json[2]['id']).to eq(field3.id)
    end
  end

  describe "POST /v1/forms/:form_id/fields" do
    context "with valid attributes" do
      it "creates a new field with auto-incremented order" do
        post v1_form_fields_path(form_id: form.id), params: { field: valid_attributes }, headers: auth_headers

        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)

        expect(json_response['name']).to eq("Test Field")
        expect(json_response['order']).to eq(0)
      end

      it "creates multiple fields with incremented order" do
        post v1_form_fields_path(form_id: form.id), params: { field: valid_attributes }, headers: auth_headers
        expect(response).to have_http_status(:created)

        post v1_form_fields_path(form_id: form.id), params: { field: valid_attributes }, headers: auth_headers
        expect(response).to have_http_status(:created)

        fields = form.fields.order(:order)
        expect(fields.first.order).to eq(0)
        expect(fields.second.order).to eq(1)
      end
    end

    context "with invalid attributes" do
      it "returns an error response" do
        post v1_form_fields_path(form_id: form.id), params: { field: invalid_attributes }, headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /v1/forms/:form_id/fields/:id" do
    let!(:field) { create(:field, form: form, order: 0) }

    it "updates a field successfully" do
      patch v1_form_field_path(form_id: form.id, id: field.id),
            params: { field: { name: "Updated Name" } }, headers: auth_headers

      expect(response).to have_http_status(:ok)
      field.reload
      expect(field.name).to eq("Updated Name")
    end

    it "does not update order if not specified" do
      original_order = field.order

      patch v1_form_field_path(form_id: form.id, id: field.id),
            params: { field: { name: "New Name" } }, headers: auth_headers

      expect(response).to have_http_status(:ok)
      field.reload
      expect(field.order).to eq(original_order)
    end

    it "returns an error with invalid attributes" do
      patch v1_form_field_path(form_id: form.id, id: field.id),
            params: { field: invalid_attributes }, headers: auth_headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "DELETE /v1/forms/:form_id/fields/:id" do
    let!(:field1) { create(:field, form: form, order: 0) }
    let!(:field2) { create(:field, form: form, order: 1) }
    let!(:field3) { create(:field, form: form, order: 2) }

    it "deletes a field and reorders the remaining fields" do
      delete v1_form_field_path(form_id: form.id, id: field2.id), headers: auth_headers

      expect(response).to have_http_status(:no_content)

      remaining_fields = form.fields.order(:order)
      expect(remaining_fields.count).to eq(2)
      expect(remaining_fields.first.order).to eq(0)
      expect(remaining_fields.second.order).to eq(1)
    end

    it "returns not found if the field does not exist" do
      delete v1_form_field_path(form_id: form.id, id: "non-existent-id"), headers: auth_headers

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "PATCH /v1/forms/:form_id/fields/reorder" do
    let!(:field1) { create(:field, form: form, order: 0) }
    let!(:field2) { create(:field, form: form, order: 1) }
    let!(:field3) { create(:field, form: form, order: 2) }

    it "reorders fields successfully" do
      patch reorder_v1_form_fields_path(form_id: form.id), params: {
        order: [ field3.id, field1.id, field2.id ]
      }, headers: auth_headers

      expect(response).to have_http_status(:ok)

      reordered_fields = json
      expect(reordered_fields[0]['id']).to eq(field3.id)
      expect(reordered_fields[1]['id']).to eq(field1.id)
      expect(reordered_fields[2]['id']).to eq(field2.id)
    end
  end
end
