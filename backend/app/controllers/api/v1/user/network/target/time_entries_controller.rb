class Api::V1::User::Network::Target::TimeEntriesController < Api::V1::User::Network::TargetsController

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/time_entries
  def index
    target_prolog or return
    authorize self

    render status: 200,
           json: {
             total_time: total_time_for_target.to_s
           }
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/time_entries
  def create
    target_prolog or return

    # Create the new block
    @time_entry = @target.time_entries.new

    # Authorize 2
    authorize @time_entry

    # Set the block's attributes.
    return render(status: 422, format: :json) unless set_time_entry

    if @time_entry.save
      render status: 200,
             json: @time_entry
    else
      render status: 422,
             body: nil
    end
  end

  protected

  # Sets the @@time_entry from parameters.
  def set_time_entry
    return false unless params[:time_entry]

    if params[:time_entry][:state] && User::Network::Target::TimeEntry.states.assoc(
      ActionController::Base.helpers.sanitize(params[:time_entry][:state])
    )
      @time_entry.state = ActionController::Base.helpers.sanitize(params[:time_entry][:state])
    end

    true
  end

  # Returns the total time for the current target.
  def total_time_for_target
    t = Time.mktime(0)
    last_state = 'start'
    last_time_entry = nil

    # Go through all time entries. The order is set via application_record.rb to :created_at.
    @target.time_entries.each do |time_entry|
      # If the first entry is a STOP entry or the previous was it also, we ignore it.
      # The time is only added if the previous entry was a START entry.
      if time_entry.state == 'stop' && last_time_entry && last_time_entry.state == 'start'
        t = t + (time_entry.created_at - last_time_entry.created_at)
      end

      last_time_entry = time_entry
    end

    t
  end

end