class Api::V1::User::Network::Target::ServicesControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

  def create_with_nmap?
    index?
  end

end
