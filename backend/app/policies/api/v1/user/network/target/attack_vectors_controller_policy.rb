class Api::V1::User::Network::Target::AttackVectorsControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

end
