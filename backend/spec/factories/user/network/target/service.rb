FactoryBot.define do
  factory :service, class: User::Network::Target::Service do
    name { Faker::Name.last_name }
    port { rand(54563) }
    protocol { "tcp" }
  end
end
