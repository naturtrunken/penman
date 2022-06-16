class AddTimeBlockTypeToUserNetworkTargetBlocks < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_blocks, :time_block_type, :integer
  end
end
