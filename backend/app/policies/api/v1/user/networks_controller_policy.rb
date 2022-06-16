class Api::V1::User::NetworksControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

end
