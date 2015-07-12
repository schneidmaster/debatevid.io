FactoryGirl.define do
  factory :video do
    provider 0
    key { [SecureRandom.hex] }
    user
    debate_type 0
    debate_level 0
    association :aff_team, factory: :team
    association :neg_team, factory: :team
    thumbnail { Faker::Internet.url }
    tournament
    live_now false
    is_featured false

    trait :live do
      live_now true
    end

    trait :featured do
      is_featured true
    end
  end
end
