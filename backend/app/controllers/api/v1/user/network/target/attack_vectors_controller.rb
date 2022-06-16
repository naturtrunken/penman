class Api::V1::User::Network::Target::AttackVectorsController < Api::V1::User::Network::TargetsController

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors
  def index
    target_prolog or return
    authorize self

    render status: 200,
           json: {
             attack_vectors: get_attack_vectors
           }
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors
  def create
    target_prolog or return

    # Create the new attack vector.
    @attack_vector = @target.attack_vectors.new
    set_attack_vector

    # Authorize 2
    authorize @attack_vector

    if @attack_vector.save
      render status: 200,
             json: @attack_vector
    else
      render status: 422,
             body: nil
    end
  end

  # PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors/:id
  def update
    target_prolog or return

    # Get the attack vector
    @attack_vector = @target.attack_vectors.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @attack_vector

    # Authorize 2
    authorize @attack_vector

    # Update the attack vector
    set_attack_vector

    if @attack_vector.save
      render status: 200,
             json: @attack_vector
    else
      render status: 422,
             body: nil
    end
  end

  # DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors/:id
  def destroy
    target_prolog or return

    # Get the target
    @attack_vector = @target.attack_vectors.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @attack_vector

    # Authorize
    authorize @attack_vector

    # Destroy the target
    @attack_vector.destroy

    render status: 200, json: nil
  end

  protected

  # Returns all attack vectors with connected services.
  def get_attack_vectors
    ret = []

    @target.attack_vectors.each do |attack_vector|
      ret.push(
        {
          attack_vector: attack_vector.as_json,
          service: attack_vector.service&.as_json
        }
      )
    end

    ret
  end

  # Sets the @attack_vector from parameters.
  def set_attack_vector
    return false unless params[:attack_vector]

    @attack_vector.text = ActionController::Base.helpers.sanitize(params[:attack_vector][:text]) if params[:attack_vector][:text]
    @attack_vector.tried = (params[:attack_vector][:tried] == 'true') if %w[true false].include?(params[:attack_vector][:tried].to_s)

    if params[:attack_vector][:service_id]
      service = @target.services.where(id: ActionController::Base.helpers.sanitize(params[:attack_vector][:service_id])).first
      @attack_vector.service = service if service
    end
  end

end