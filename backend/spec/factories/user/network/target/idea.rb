FactoryBot.define do
  factory :idea, class: User::Network::Target::Idea do
    text { Faker::Lorem.sentence }
    tried { false }
  end
end
