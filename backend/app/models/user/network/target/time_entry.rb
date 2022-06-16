class User::Network::Target::TimeEntry < ActiveRecord::Base
  belongs_to :target,
             class_name: 'User::Network::Target',
             foreign_key: :user_network_target_id

  enum state: [
    :start,
    :stop
  ]
end
