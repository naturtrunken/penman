class User::Network::Target::AttackVectorPolicy < ApplicationPolicy

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
