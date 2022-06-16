class CreateUserNetworkTargetBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_target_blocks, id: :uuid do |t|
      t.string :user_network_target_id, null: false, index: true
      t.text :text
      t.integer :phase, default: 0, null: false

      t.timestamps
    end
  end
end
