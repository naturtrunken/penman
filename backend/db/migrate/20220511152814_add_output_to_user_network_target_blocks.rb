class AddOutputToUserNetworkTargetBlocks < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_blocks, :output, :text
  end
end
