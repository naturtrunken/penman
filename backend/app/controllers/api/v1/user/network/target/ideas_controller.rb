class Api::V1::User::Network::Target::IdeasController < Api::V1::User::Network::TargetsController

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas
  def index
    target_prolog or return
    authorize self

    render status: 200,
           json: {
             ideas: get_ideas
           }
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas
  def create
    target_prolog or return

    # Create the new idea.
    @idea = @target.ideas.new
    set_idea

    # Authorize 2
    authorize @idea

    if @idea.save
      render status: 200,
             json: @idea
    else
      render status: 422,
             body: nil
    end
  end

  # PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas/:id
  def update
    target_prolog or return

    # Get the idea
    @idea = @target.ideas.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @idea

    # Authorize 2
    authorize @idea

    # Update the idea
    set_idea

    if @idea.save
      render status: 200,
             json: @idea
    else
      render status: 422,
             body: nil
    end
  end

  # DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas/:id
  def destroy
    target_prolog or return

    # Get the idea
    @idea = @target.ideas.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @idea

    # Authorize
    authorize @idea

    # Destroy the idea
    @idea.destroy

    render status: 200, json: nil
  end

  protected

  # Returns all attack vectors with connected services.
  def get_ideas
    ret = []

    @target.ideas.each do |idea|
      ret.push(
        {
          idea: idea.as_json,
          service: idea.service&.as_json
        }
      )
    end

    ret
  end

  # Sets the @ideas from parameters.
  def set_idea
    return false unless params[:idea]

    @idea.text = ActionController::Base.helpers.sanitize(params[:idea][:text]) if params[:idea][:text]
    @idea.tried = (params[:idea][:tried] == 'true') if %w[true false].include?(params[:idea][:tried].to_s)

    if params[:idea][:service_id]
      service = @target.services.where(id: ActionController::Base.helpers.sanitize(params[:idea][:service_id])).first
      @idea.service = service if service
    end

  end

end