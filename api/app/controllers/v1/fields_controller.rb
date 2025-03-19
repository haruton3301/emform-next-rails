class V1::FieldsController < ApplicationController
  before_action :authenticate_v1_user!
  before_action :set_form
  before_action :set_field, only: [ :update, :destroy ]

  def index
    fields = @form.fields.order(:order)
    render json: fields, status: :ok
  end

  def create
    next_order = @form.fields.any? ? @form.fields.maximum(:order).to_i + 1 : 0
    @field = @form.fields.new(field_params.merge(order: next_order))

    if @field.save
      render json: @field, status: :created
    else
      render json: @field.errors, status: :unprocessable_entity
    end
  end

  def update
    field_update_params = field_params
    field_update_params.delete(:order) if field_update_params[:order].nil?

    if @field.update(field_update_params)
      render json: @field, status: :ok
    else
      render json: @field.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @field.destroy

    reorder_fields_after_deletion

    head :no_content
  end

  def reorder
    reorder_params[:order].each_with_index do |id, index|
      field = @form.fields.find_by(id: id)
      field.update(order: index) if field
    end

    render json: @form.fields.order(:order), status: :ok
  end

  private

  def set_form
    @form = current_v1_user.forms.find(params[:form_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Form not found" }, status: :not_found
  end

  def set_field
    @field = @form.fields.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Field not found" }, status: :not_found
  end

  def field_params
    params.require(:field).permit(:name, :label, :field_type, :is_required, :order)
  end

  def reorder_params
    params.permit(order: [])
  end

  def reorder_fields_after_deletion
    @form.fields.order(:order).each_with_index do |field, index|
      field.update(order: index)
    end
  end
end
