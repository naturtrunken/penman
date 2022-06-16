class Api::V1::User::NetworksController < Api::V1::UsersController

  # GET /api/v1/users/:user_id/networks
  def index
    user_prolog or return

    # Authorize
    authorize self
    return render(status: 403, format: :json) if @user != current_api_user

    render status: 200,
           json: {
             networks: @user.networks
           }
  end
  
  # GET /api/v1/users/:user_id/networks/:id
  def show
    user_prolog or return

    # Get the network
    @network = User::Network.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @network

    # Authorize
    authorize @network

    render status: 200,
           json: @network
  end
  
  # POST /api/v1/users/:user_id/networks
  def create
    user_prolog or return

    # Create the new network
    @network = @user.networks.new
    unless set_network
      skip_authorization
      return render(status: 422, format: :json)
    end

    # Authorize
    authorize @network

    if @network.save
      render status: 200,
             json: {
               network: @network
             }
    else
      render status: 422,
             body: nil
    end
  end

  # PUT /api/v1/users/:user_id/networks/:id
  def update
    user_prolog or return

    # Get the network.
    @network = User::Network.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @network

    # Authorize
    authorize @network

    # Update the network
    unless set_network
      skip_authorization
      return render(status: 422, format: :json)
    end

    if @network.save
      render status: 200,
             json:  @network
    else
      render status: 422,
             body: nil
    end
  end

  # DELETE /api/v1/users/:user_id/networks/:id
  def destroy
    user_prolog or return

    # Get the network.
    @network = User::Network.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @network

    # Authorize
    authorize @network

    # Destroy the network
    @network.destroy

    render status: 200,
           json: nil
  end

  # Sets the @@network from parameters.
  protected

  def set_network
    return false unless params[:network]
    @network.name = ActionController::Base.helpers.sanitize(params[:network][:name]) if params[:network][:name]
  end

  # Gets various objects from the parameter.
  def network_prolog
    @user = User.where(id: ActionController::Base.helpers.sanitize(params[:user_id])).first
    unless @user
      render(status: 404, format: :json)
      skip_authorization
      return false
    end

    @network = User::Network.where(id: ActionController::Base.helpers.sanitize(params[:network_id])).first
    unless @network
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

    if @network.user != current_api_user
      render(status: 403, format: :json)
      skip_authorization
      return false
    end

    true
  end

end