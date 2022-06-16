FactoryBot.define do
  factory :api_key, class: User::ApiKey do
    value { Faker::Crypto.sha1 }
  end
end
