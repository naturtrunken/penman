class AddTriedToUserNetworkTargetIdeas < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_ideas, :tried, :boolean, default: false
  end
end
