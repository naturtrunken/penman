class CreateUserNetworkTargetTimeEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_target_time_entries, id: :uuid do |t|
      t.string :user_network_target_id, index: {name: 'untte_untid' }, null: false
      t.integer :state, null: false, default: 0

      t.timestamps
    end
  end
end
