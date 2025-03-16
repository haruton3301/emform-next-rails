FactoryBot.define do
  factory :form do
    title { "MyString" }
    description { "MyText" }
    is_publish { false }
    user { nil }
  end
end
