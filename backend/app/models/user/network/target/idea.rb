class User::Network::Target::Idea < ActiveRecord::Base
  belongs_to :target,
       class_name: 'User::Network::Target',
       foreign_key: :user_network_target_id
  belongs_to :service,
             class_name: 'User::Network::Target::Service',
             foreign_key: :user_network_target_service_id,
             optional: true

  validates_presence_of :text
end
