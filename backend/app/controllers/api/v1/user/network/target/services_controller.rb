class Api::V1::User::Network::Target::ServicesController < Api::V1::User::Network::TargetsController

  # GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/services
  def index
    target_prolog or return
    authorize self

    render status: 200,
           json: {
             services: @target.services
           }
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/services
  def create
    target_prolog or return

    # Create the new service
    @service = @target.services.new
    set_service

    # Authorize 2
    authorize @service

    if @service.save
      render status: 200,
             json: @service
    else
      render status: 422,
             body: nil
    end
  end

  # DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:id
  def destroy
    target_prolog or return

    # Get the service
    @service = @target.services.where(id: ActionController::Base.helpers.sanitize(params[:id])).first
    return render(status: 404, format: :json) unless @service

    # Authorize
    authorize @service

    # Destroy the service
    @service.destroy

    render status: 200,
           json: nil
  end

  # POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/services/create_with_nmap
  def create_with_nmap
    target_prolog or return
    authorize self

    errors = []
    nmap_doc = Nokogiri::XML(params[:nmap_xml].read)
    nmap_doc.xpath('//port').each do |port_node|
      protocol = port_node.attr('protocol')
      port = port_node.attr('portid')
      name = port_node.xpath('service').attr('name').to_s

      # Do we have this service already?
      if @target.services.where(protocol: protocol).where(port: port).count == 0
        service = @target.services.new(
          protocol: protocol,
          port: port,
          name: name
        )
        unless service.save
          errors.push("Could not add service #{protocol}/#{port}:#{name}: #{service.errors.full_messages.to_s}")
        end
      end
    end

    if errors.length == 0
      render status: 200,
             json: nil
    else
      render status: 200,
             json: {
               errors: errors.join(',')
             }
    end
  end

  protected

  # Sets the @service from parameters.
  def set_service
    return false unless params[:service]

    [:name, :port].each do |attr|
      @service.send("#{attr}=", ActionController::Base.helpers.sanitize(params[:service][attr])) if params[:service][attr]
    end

    if params[:service][:protocol] && User::Network::Target::Service.protocols.assoc(
      ActionController::Base.helpers.sanitize(params[:service][:protocol])
    )
      @service.protocol = ActionController::Base.helpers.sanitize(params[:service][:protocol])
    end
  end

end