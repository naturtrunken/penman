class User::Network::Target::BlockPolicy < ApplicationPolicy

  def create?
    @user
  end

  def destroy?
    @user && @user == @record.target.network.user
  end

  def update?
    destroy?
  end

end
