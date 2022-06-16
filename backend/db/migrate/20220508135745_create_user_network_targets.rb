class CreateUserNetworkTargets < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_targets, id: :uuid do |t|
      t.string :user_network_id, null: false, index: true
      t.string :name
      t.timestamps
    end
  end
end
