FactoryBot.define do
  factory :user do
    email {Faker::Internet.email}
    password {Faker::Internet.password(min_length: 16)}

    after(:build) do |u|
      u.password_confirmation = u.password
    end
  end
end
