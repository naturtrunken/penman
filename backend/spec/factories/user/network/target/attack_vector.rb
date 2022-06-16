FactoryBot.define do
  factory :attack_vector, class: User::Network::Target::AttackVector do
    text { Faker::Lorem.sentence }
    tried { false }
  end
end
