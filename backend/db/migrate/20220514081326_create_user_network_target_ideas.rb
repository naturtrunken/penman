class CreateUserNetworkTargetIdeas < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_target_ideas, id: :uuid do |t|
      t.string :user_network_target_id, index: {name: 'untai_untid' }, null: false
      t.string :user_network_target_service_id
      t.string :text

      t.timestamps
    end
  end
end
