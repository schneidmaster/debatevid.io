FactoryGirl.define do
  factory :user do
    provider { Faker::Lorem.word }
    uid { SecureRandom.hex }
    name { Faker::Name.name }
    avatar { Faker::Internet.url }
    is_admin false

    trait :admin do
      is_admin true
    end
  end
end
