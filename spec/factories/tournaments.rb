FactoryGirl.define do
  factory :tournament do
    year 2014
    name { Faker::Lorem.word }
  end
end
