FactoryBot.define do
  factory :target, class: User::Network::Target do
    name { Faker::Internet.domain_word }
    ip { Faker::Internet.ip_v4_address }
  end
end
