class Api::V1::User::Network::TargetsControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

end
