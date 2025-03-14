class V1::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:email, :password)
  end
  # def sign_up_params
  #   params.require(:registration).permit(:email, :password)
  # end
end
