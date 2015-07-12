FactoryGirl.define do
  factory :school do
    name { Faker::Lorem.word }
    short_name { Faker::Lorem.word }
  end
end
