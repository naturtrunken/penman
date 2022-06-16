FactoryBot.define do
  factory :time_entry, class: User::Network::Target::TimeEntry do
    state { 0 }
  end
end
