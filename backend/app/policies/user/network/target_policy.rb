class User::Network::TargetPolicy < ApplicationPolicy

  def create?
    @user
  end

  def show?
    @user && @user.networks.include?(@record.network)
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  def timeline?
    show?
  end

end
