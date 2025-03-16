class Form < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 255 }
  validates :description, length: { maximum: 1000 }
  validates :is_publish, inclusion: { in: [ true, false ] }
end
