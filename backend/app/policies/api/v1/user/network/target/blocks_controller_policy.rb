class Api::V1::User::Network::Target::BlocksControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

end
