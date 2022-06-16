class User::Network::Target::Service < ActiveRecord::Base
  belongs_to :target,
       class_name: 'User::Network::Target',
       foreign_key: :user_network_target_id

  validates_presence_of :name, :port

  enum protocol: [
    :tcp,
    :udp
  ]

  # Destroy the connected objects as well.
  before_destroy do
    User::Network::Target::Block.where(user_network_target_service_id: self.id).destroy_all
    User::Network::Target::AttackVector.where(user_network_target_service_id: self.id).destroy_all
    User::Network::Target::Idea.where(user_network_target_service_id: self.id).destroy_all
  end

end
