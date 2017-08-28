# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = 'https://www.debatevid.io'

# Use Heroku's /tmp while generating
SitemapGenerator::Sitemap.public_path = 'tmp/'

# Upload to S3 when done
adapter_params = {
  fog_provider: 'AWS',
  aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
  aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  fog_directory: ENV['S3_BUCKET_NAME'],
}
SitemapGenerator::Sitemap.adapter = SitemapGenerator::S3Adapter.new(adapter_params)

# Inform the map cross-linking where to find the other maps
SitemapGenerator::Sitemap.sitemaps_host = "http://#{ENV['S3_BUCKET_NAME']}.s3.amazonaws.com/"

# Organize sitemaps within s3 bucket
SitemapGenerator::Sitemap.sitemaps_path = 'sitemaps/'

SitemapGenerator::Sitemap.create do
  Video.all.each do |video|
    add video_path(video), priority: 0.8, changefreq: :daily
  end

  add page_path('faq'), priority: 0.6, changefreq: :weekly

  Debater.all.each do |debater|
    add debater_path(debater), priority: 0.4, changefreq: :monthly
  end

  School.all.each do |school|
    add school_path(school), priority: 0.4, changefreq: :monthly
  end

  Team.all.each do |team|
    add team_path(team), priority: 0.4, changefreq: :monthly
  end

  Tournament.all.each do |tournament|
    add tournament_path(tournament), priority: 0.4, changefreq: :monthly
  end

  Tag.all.each do |tag|
    add tag_path(tag), priority: 0.4, changefreq: :monthly
  end
end
