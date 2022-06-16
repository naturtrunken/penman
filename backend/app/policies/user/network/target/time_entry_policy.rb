class User::Network::Target::TimeEntryPolicy < ApplicationPolicy

  def create?
    @user && @user == @record.target.network.user
  end

end
