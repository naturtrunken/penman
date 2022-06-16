class AddIpToUserNetworkTargets < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_targets, :ip, :inet
  end
end
