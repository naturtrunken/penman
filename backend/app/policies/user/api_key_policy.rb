class User::ApiKeyPolicy < ApplicationPolicy

  def create?
    @user
  end

  def show?
    @user && (@user == @record.user)
  end

end
