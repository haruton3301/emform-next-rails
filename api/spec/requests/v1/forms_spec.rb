require 'rails_helper'

RSpec.describe "V1::Forms", type: :request do
  let(:user) { create(:user) }
  let(:valid_attributes) { { title: 'Test Form', description: 'This is a test form.' } }
  let(:invalid_attributes) { { title: '', description: '' } }
  let(:form) { create(:form, user: user) }

  # devise-token-authで認証トークンを作成
  let(:auth_headers) { user.create_new_auth_token }

  describe 'POST /forms' do
    context 'with valid attributes' do
      it 'creates a new form and returns a success response' do
        post v1_forms_path, params: { form: valid_attributes }, headers: auth_headers

        expect(response).to have_http_status(:created)
        expect(json['title']).to eq('Test Form')
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new form and returns an error response' do
        post v1_forms_path, params: { form: invalid_attributes }, headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET /forms' do
    it 'returns a list of forms for the current user' do
      create_list(:form, 3, user: user) # 3つのフォームを作成

      get v1_forms_path, headers: auth_headers

      expect(response).to have_http_status(:ok)
      expect(json.length).to eq(3)  # 返却されるフォームの数が3であること
    end
  end

  describe 'GET /forms/:id' do
    it 'returns a specific form for the current user' do
      get v1_form_path(form.id), headers: auth_headers

      expect(response).to have_http_status(:ok)
      expect(json['id']).to eq(form.id)
      expect(json['title']).to eq(form.title)
      expect(json['description']).to eq(form.description)
    end
  end

  describe 'PATCH/PUT /forms/:id' do
    context 'with valid attributes' do
      it 'updates the form and returns a success response' do
        patch v1_form_path(form.id), params: { form: { title: 'Updated Title', description: 'Updated Description' } }, headers: auth_headers

        form.reload
        expect(form.title).to eq('Updated Title')
        expect(form.description).to eq('Updated Description')
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid attributes' do
      it 'does not update the form and returns an error response' do
        patch v1_form_path(form.id), params: { form: invalid_attributes }, headers: auth_headers

        form.reload
        expect(form.title).not_to eq('')
        expect(form.description).not_to eq('')
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /forms/:id/update_publish_status' do
    it 'updates the is_publish status and returns a success response' do
      patch update_publish_status_v1_form_path(form.id), params: { is_publish: false }, headers: auth_headers

      form.reload
      expect(form.is_publish).to be(false)
      expect(response).to have_http_status(:ok)
    end

    it 'returns an error if the update fails' do
      patch update_publish_status_v1_form_path(form.id), params: { is_publish: nil }, headers: auth_headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'DELETE /forms/:id' do
    it 'deletes the form and returns a success response' do
      form_to_delete = create(:form, user: user)

      expect {
        delete v1_form_path(form_to_delete.id), headers: auth_headers
      }.to change(Form, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
