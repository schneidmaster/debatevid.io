FactoryGirl.define do
  factory :debater do
    school
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
  end
end
