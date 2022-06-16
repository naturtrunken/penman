class Api::V1::User::Network::Target::IdeasControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

end
