class User::Network::Target < ActiveRecord::Base
  belongs_to :network,
             class_name: 'User::Network',
             foreign_key: :user_network_id
  has_many :blocks,
           class_name: 'User::Network::Target::Block',
           foreign_key: :user_network_target_id
  has_many :services,
           class_name: 'User::Network::Target::Service',
           foreign_key: :user_network_target_id
  has_many :attack_vectors,
           class_name: 'User::Network::Target::AttackVector',
           foreign_key: :user_network_target_id
  has_many :ideas,
           class_name: 'User::Network::Target::Idea',
           foreign_key: :user_network_target_id
  has_many :time_entries,
           class_name: 'User::Network::Target::TimeEntry',
           foreign_key: :user_network_target_id

  enum state: [
    :s_new,
    :s_open,
    :s_user,
    :s_root
  ]

end
