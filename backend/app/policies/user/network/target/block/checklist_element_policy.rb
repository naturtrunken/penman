class User::Network::Target::Block::ChecklistElementPolicy < ApplicationPolicy

  def update?
    @user && @user == @record.block.target.network.user
  end

end
