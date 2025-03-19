FactoryBot.define do
  factory :field do
    form { nil }
    name { "MyString" }
    label { "MyString" }
    order { 1 }
    field_type { 1 }
    is_required { false }
  end
end
