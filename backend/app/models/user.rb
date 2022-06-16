class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User

  # Include default devise modules. Others available are:
  # :lockable, :trackable and :omniauthable and :confirmable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :timeoutable

  include DeviseTokenAuth::Concerns::User
  before_save -> do
    skip_confirmation!
  end

  has_many :networks,
           class_name: 'User::Network',
           dependent: :destroy
  has_one :api_key,
          class_name: 'User::ApiKey',
          dependent: :destroy
end
