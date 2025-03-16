FactoryBot.define do
  factory :user do
    email { "testuser@example.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
