class User::Network::Target::Block::ChecklistElement < ActiveRecord::Base
  belongs_to :block,
             class_name: 'User::Network::Target::Block',
             foreign_key: :user_network_target_block_id

  validates_presence_of :value
end
