class Api::V1::User::Network::Target::Block::ChecklistElementsController < Api::V1::User::Network::Target::BlocksController

  # PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:block_id/checklist_elements/:id
  def update
    block_prolog or return

    # Get the checklist element
    @checklist_element = @block.checklist_elements.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @checklist_element

    # Authorize 2
    authorize @checklist_element

    # Update
    set_checklist_element

    if @checklist_element.save
      render status: 200,
             json: @checklist_element
    else
      render status: 422,
             body: nil
    end
  end

  protected

  # Sets the @checklist_element from parameters.
  def set_checklist_element
    return false unless params[:checklist_element]

    @checklist_element.checked = (params[:checklist_element][:checked] == 'true') if %w[true false].include?(params[:checklist_element][:checked].to_s)

    true
  end

end