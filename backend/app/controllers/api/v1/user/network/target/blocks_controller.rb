class Api::V1::User::Network::Target::BlocksController < Api::V1::User::Network::TargetsController

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks
  def index
    target_prolog or return
    authorize self

    # Get the blocks.
    @blocks = @target.blocks

    # Apply the phase filter, if we have one with valid value.
    if params[:phase] && User::Network::Target::Block.phases.assoc(
      ActionController::Base.helpers.sanitize(params[:phase])
    )
      @blocks = @blocks.where(phase: ActionController::Base.helpers.sanitize(params[:phase]))
    end

    # Apply the service filter, if we have one with valid value.
    if params[:service_id] == "none"
      # Special case: Return only blocks which are not assigned to a service.
      @blocks = @blocks.where(user_network_target_service_id: nil)
    elsif params[:service_id]
      # Return only blocks which are assigned to a service.
      service = @target.services.where(id: ActionController::Base.helpers.sanitize(params[:service_id])).first
      if service
        @blocks = @blocks.where(user_network_target_service_id: ActionController::Base.helpers.sanitize(params[:service_id]))
      end
    end

    render status: 200,
           json: {
             blocks: @blocks
           }
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks
  def create
    target_prolog or return

    # Create the new block
    @block = @target.blocks.new
    return render(status: 422, format: :json) unless set_block

    # Authorize 2
    authorize @block

    if @block.save
      render status: 200,
             json: @block
    else
      render status: 422,
             body: nil
    end
  end

  # PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:id
  def update
    target_prolog or return

    # Get the block
    @block = @target.blocks.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @block

    # Authorize 2
    authorize @block

    # Update the block
    return render(status: 422, format: :json) unless set_block

    if @block.save
      render status: 200,
             json: @block
    else
      render status: 422,
             body: nil
    end
  end

  # DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:id
  def destroy
    target_prolog or return

    # Get the block
    @block = @target.blocks.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @block

    # Authorize
    authorize @block

    # Destroy the target
    @block.destroy

    render status: 200,
           json: nil
  end

  protected

  # Sets the @block from parameters.
  def set_block
    return false unless params[:block]

    @block.text = ActionController::Base.helpers.sanitize(params[:block][:text]) if params[:block][:text]

    # NO sanitation - we actually want to add here raw input.
    # Has to been sanitized when printed out.
    @block.output = params[:block][:output] if params[:block][:output]

    if params[:block][:service_id]
      service = @target.services.where(id: ActionController::Base.helpers.sanitize(params[:block][:service_id])).first
      @block.service = service if service
    end

    if params[:block][:phase] && User::Network::Target::Block.phases.assoc(
      ActionController::Base.helpers.sanitize(params[:block][:phase])
    )
      @block.phase = ActionController::Base.helpers.sanitize(params[:block][:phase])
    end

    if params[:block][:flag] && User::Network::Target::Block.flags.assoc(
      ActionController::Base.helpers.sanitize(params[:block][:flag])
    )
      @block.flag = ActionController::Base.helpers.sanitize(params[:block][:flag])
    end

    # Process all uploaded files
    0.upto(Rails.configuration.global[:FILE_UPLOAD_MAX_ELEMENTS]-1) do |i|
      @block.files.attach(params[:block]["file#{i}"]) if params[:block]["file#{i}"]
    end

    # Create the checklist items.
    if params[:block][:checklist_elements] && params[:block][:checklist_elements].is_a?(String)
      params[:block][:checklist_elements].split("\n").each do |checklist_element|
        new_checklist_element = @block.checklist_elements.new(
          value: ActionController::Base.helpers.sanitize(checklist_element)&.chomp
        )
        new_checklist_element.block = @block # TODO Why? Should not be necessary.
        new_checklist_element.save!
      end
    end

    true
  end

  # Gets various objects from the parameter.
  def block_prolog
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

    @block = @target.blocks.where(id: ActionController::Base.helpers.sanitize(params[:block_id])).first
    unless @block
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