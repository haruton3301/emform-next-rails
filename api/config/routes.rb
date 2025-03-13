Rails.application.routes.draw do
  namespace :v1 do
    mount_devise_token_auth_for "User", at: "auth", controllers: {
      registrations: "v1/registrations"
    }
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
