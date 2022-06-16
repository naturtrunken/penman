class CreateUserNetworkTargetBlockChecklistElements < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_target_block_checklist_elements, id: :uuid do |t|
      t.string :user_network_target_block_id, index: {name: 'untbce_untbi' }, null: false
      t.string :value
      t.boolean :checked, default: false

      t.timestamps
    end
  end
end
