FactoryGirl.define do
  factory :team do
    school
    association :debater_one, factory: :debater
    association :debater_two, factory: :debater
  end
end
