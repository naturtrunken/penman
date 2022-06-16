class RemoveTimeBlockType < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_network_target_blocks, :time_block_type, :integer
  end
end
