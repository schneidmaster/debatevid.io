require 'faker'

raise 'Log in first to generate a user before seeding' if User.none?
user = User.first

# Create some schools.
schools = 5.times.map do
  School.create(name: Faker::Lorem.word, short_name: Faker::Lorem.word)
end

# Create debaters.
debaters = 20.times.map do
  schools.sample.debaters.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name)
end

# Create teams.
teams = 10.times.map do
  school = schools.sample
  team_debaters = school.debaters.sample(2)
  school.teams.create(debater_one: debaters.first, debater_two: debaters.second)
end

# Create tournaments.
tournaments = 5.times.map do
  Tournament.create(year: rand(2014..2017), name: Faker::Lorem.word)
end

# Create videos.
videos = 25.times.map do
  video_teams = teams.sample(2)
  Video.create(
    provider: :youtube,
    key: %w[Jd2p6GqQ5uw],
    user: user,
    debate_type: :parli,
    debate_level: :college,
    aff_team: video_teams.first,
    neg_team: video_teams.second,
    thumbnail: 'https://img.youtube.com/vi/Jd2p6GqQ5uw/hqdefault.jpg',
    tournament: tournaments.sample,
    live_now: false,
    is_featured: rand(0..25) > 23
  )
end

# Create tags.
tags = 15.times.map do
  Tag.create(title: Faker::Lorem.word)
end

videos.each do |video|
  tags.sample(3).each do |tag|
    video.tags << tag
  end
end
