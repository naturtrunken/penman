class Api::V1::UsersController < Api::V1Controller
  before_action :authenticate_user

  protected

  def authenticate_user
    if params[:api_key] && params[:api_key] != '' && params[:api_key].is_a?(String)
      # Try API key authentication.
      @api_key = User::ApiKey.where(value: ActionController::Base.helpers.sanitize(params[:api_key])).first
      unless @api_key
        render(status: 401, format: :json)
        skip_authorization
        return false
      end

      # Log in the user to which the API key belongs to.
      sign_in(:users, @api_key.user, store: false, bypass: false)
    else
      # Normal authentication
      authenticate_api_user!
    end
  end

  # Gets various objects from the parameter.
  def user_prolog
    # Get the user and network.
    @user = User.where(id: ActionController::Base.helpers.sanitize(params[:user_id])).first
    unless @user
      render(status: 404, format: :json)
      skip_authorization
      return false
    end

    # Authorize 1
    if @user != current_api_user
      render(status: 403, format: :json)
      skip_authorization
      return false
    end

    true
  end

end