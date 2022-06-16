class AddTriedToUserNetworkTargetAttackVectors < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_attack_vectors, :tried, :boolean, default: false
  end
end
