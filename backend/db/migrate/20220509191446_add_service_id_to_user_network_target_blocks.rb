class AddServiceIdToUserNetworkTargetBlocks < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_blocks, :user_network_target_service_id, :string, index: true
  end
end
