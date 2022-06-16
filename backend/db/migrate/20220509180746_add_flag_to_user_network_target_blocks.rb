class AddFlagToUserNetworkTargetBlocks < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_blocks, :flag, :integer, default: 0, null: false
  end
end
