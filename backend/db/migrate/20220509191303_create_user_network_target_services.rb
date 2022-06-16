class CreateUserNetworkTargetServices < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_target_services, id: :uuid do |t|
      t.string :user_network_target_id, index: true, null: false

      t.string :name, null: false
      t.integer :port, null: false
      t.integer :protocol, null: false, default: 0

      t.timestamps
    end
  end
end
