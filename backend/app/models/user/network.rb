class User::Network < ActiveRecord::Base
  belongs_to :user
  has_many :targets,
           class_name: 'User::Network::Target',
           dependent: :destroy,
           foreign_key: :user_network_id

  validates_presence_of :name
end
