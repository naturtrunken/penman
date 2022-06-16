class RenameNetworksToUserNetworks < ActiveRecord::Migration[7.0]
  def change
    rename_table :networks, :user_networks
  end
end
