class Api::V1::User::Network::TargetsController < Api::V1::User::NetworksController

  # GET /api/v1/users/:user_id/networks/:network_id
  def index
    network_prolog or return
    authorize self

    render status: 200,
           json: {
             targets: @network.targets
           }
  end

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:id
  def show
    network_prolog or return

    # Get the target
    @target = @network.targets.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @target

    # Authorize 2
    authorize @target

    render status: 200,
           json: @target
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets
  def create
    network_prolog or return

    # Create the new network
    @target = @network.targets.new
    set_target

    # Authorize 2
    authorize @target

    if @target.save
      render status: 200,
             json: @target
    else
      render status: 422,
             body: nil
    end
  end

  # PUT /api/v1/users/:user_id/networks/:network_id/targets/:id
  def update
    network_prolog or return

    # Get the target
    @target = @network.targets.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @target

    # Authorize 2
    authorize @target

    # Update the target
    set_target

    if @target.save
      render status: 200,
             json: @target
    else
      render status: 422,
             body: nil
    end
  end

  # DELETE /api/v1/users/:user_id/networks/:network_id/targets/:id
  def destroy
    network_prolog or return

    # Get the target
    @target = @network.targets.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @target

    # Authorize
    authorize @target

    # Destroy the target
    @target.destroy

    render status: 200,
           json: nil
  end

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/timeline
  def timeline
    network_prolog or return

    # Get the target
    @target = @network.targets.where(id: ActionController::Base.helpers.sanitize(params[:target_id])).first
    return render(status: 404, format: :json) unless @target

    # Authorize
    authorize @target

    render status: 200,
           json: {
             timeline: create_timeline_for_target(@target)
           }
  end

  protected

  # Gets various objects from the parameter.
  def target_prolog
    # Get the user and network.
    @user = User.where(id: ActionController::Base.helpers.sanitize(params[:user_id])).first
    unless @user
      render(status: 404, format: :json)
      skip_authorization
      return false
    end

    @network = @user.networks.where(id: ActionController::Base.helpers.sanitize(params[:network_id])).first
    unless @network
      render(status: 404, format: :json)
      skip_authorization
      return false
    end

    @target = @network.targets.where(id: ActionController::Base.helpers.sanitize(params[:target_id])).first
    unless @target
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

  # Creates a timeline for the given target and returns it as hash.
  def create_timeline_for_target(target)
    ret = []

    target.blocks.each do |block|
      ret.push(
        {
          block: block.as_json,
          service: block.service&.as_json
        }
      )
    end

    ret
  end

  # Sets the @target from parameters.
  def set_target
    return false unless params[:target]

    @target.name = ActionController::Base.helpers.sanitize(params[:target][:name]) if params[:target][:name]
    @target.ip = ActionController::Base.helpers.sanitize(params[:target][:ip]) if params[:target][:ip]

    if params[:target][:state] && User::Network::Target.states.assoc(
      ActionController::Base.helpers.sanitize(params[:target][:state])
    )
      @target.state = ActionController::Base.helpers.sanitize(params[:target][:state])
    end

  end

end