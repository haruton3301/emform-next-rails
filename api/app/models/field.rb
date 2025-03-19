class Field < ApplicationRecord
  belongs_to :form

  enum :field_type, { input: 0, textarea: 1 }

  validates :name, presence: true
  validates :label, presence: true
  validates :order, presence: true, numericality: { only_integer: true }
  validates :field_type, presence: true, inclusion: { in: field_types.keys }
  validates :is_required, inclusion: { in: [ true, false ] }
  validates :order, presence: true
end
