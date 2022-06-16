class Api::V1::User::ApiKeysController < Api::V1::UsersController

  # POST /api/v1/users/:user_id/api_key
  def create
    user_prolog or return

    # Create the new api key
    @api_key = @user.build_api_key

    # Authorize
    authorize @api_key

    if @api_key.save
      render status: 200,
             json: @api_key
    else
      render status: 422,
             body: nil
    end
  end

  # GET /api/v1/users/:user_id/api_key
  def show
    user_prolog or return

    @api_key = @user.api_key

    # Create an api key, if the user doesn't have one yet.
    unless @api_key
      @api_key = @user.build_api_key
      @api_key.save!
    end

    authorize @api_key

    render status: 200,
           json: @api_key
  end

end