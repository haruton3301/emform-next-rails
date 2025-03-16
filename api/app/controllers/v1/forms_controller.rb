class V1::FormsController < ApplicationController
  before_action :authenticate_v1_user!
  before_action :set_form, only: [ :update, :update_publish_status, :destroy ]

  # POST /forms
  def create
    @form = current_v1_user.forms.new(form_params)

    if @form.save
      render json: @form, status: :created
    else
      render json: @form.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /forms/:id
  def update
    if @form.update(form_params)
      render json: @form, status: :ok
    else
      render json: @form.errors, status: :unprocessable_entity
    end
  end

  # PATCH /forms/:id/update_publish_status
  def update_publish_status
    if @form.update(is_publish: params[:is_publish])
      render json: @form, status: :ok
    else
      render json: @form.errors, status: :unprocessable_entity
    end
  end

  # DELETE /forms/:id
  def destroy
    @form.destroy
    head :no_content
  end

  private

  def set_form
    @form = current_v1_user.forms.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Form not found" }, status: :not_found
  end

  def form_params
    params.require(:form).permit(:title, :description)
  end
end
