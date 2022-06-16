class ChangeUserNetworkTargetsIpToString < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_network_targets, :ip
    add_column :user_network_targets, :ip, :string
  end
end
