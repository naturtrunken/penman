class MainController < ApplicationController

  # Just a static output to check after the installation
  # with curl localhost:3000 if the backend is online.
  def index
    skip_authorization
    render status: 200,
           json: {
             status: "Backend online"
           }
  end

end
