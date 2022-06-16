FactoryBot.define do
  factory :checklist_element, class: User::Network::Target::Block::ChecklistElement do
    value { Faker::Lorem.sentence }
    checked { false }
  end
end
