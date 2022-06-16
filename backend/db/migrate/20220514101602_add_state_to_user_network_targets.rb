class AddStateToUserNetworkTargets < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_targets, :state, :integer, null: false, default: 0
  end
end
