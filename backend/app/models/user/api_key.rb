class User::ApiKey < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :value
  validates_uniqueness_of :value, scope: :user_id

  before_validation do
    self.value = SecureRandom.uuid unless self.value
  end
end
