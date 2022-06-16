FactoryBot.define do
  factory :network, class: User::Network do
    name { Faker::Internet.domain_word }
  end
end
