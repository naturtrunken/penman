class Api::V1::User::Network::Target::TimeEntriesControllerPolicy < ApplicationPolicy

  def index?
    @user
  end

end
