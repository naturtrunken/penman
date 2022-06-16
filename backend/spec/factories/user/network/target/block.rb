FactoryBot.define do
  factory :block, class: User::Network::Target::Block do
    text { Faker::Lorem.paragraph }
    output { Faker::Lorem.paragraph }
    phase { 0 }
  end
end
