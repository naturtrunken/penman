class CreateUserNetworkTargetAttackVectors < ActiveRecord::Migration[7.0]
  def change
    create_table :user_network_target_attack_vectors, id: :uuid do |t|
      t.string :user_network_target_id, index: {name: 'untav_untid' }, null: false
      t.string :text, null: false

      t.timestamps
    end
  end
end
