class User::NetworkPolicy < ApplicationPolicy

  def create?
    @user
  end

  def show?
    @user && (@user == @record.user)
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

end
