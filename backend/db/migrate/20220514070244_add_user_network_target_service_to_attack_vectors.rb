class AddUserNetworkTargetServiceToAttackVectors < ActiveRecord::Migration[7.0]
  def change
    add_column :user_network_target_attack_vectors, :user_network_target_service_id, :string

  end
end
