if Rails.env.production? && ENV['SENTRY_DSN']
  Raven.configure do |config|
    config.dsn = ENV['SENTRY_DSN']
  end
end
