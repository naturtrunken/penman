class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  after_action :verify_authorized, unless: :devise_controller?

  # Returns a 403 json if the user isn't authenticated.
  def user_not_authorized
    render status: 403,
           format: :json
  end

  # We do not use current_user here because of Devise Token Auth, which uses
  # current_api_user. Therefore, we have to tell Pundit to use this function.
  def pundit_user
    current_api_user
  end
end
