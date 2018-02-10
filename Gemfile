source 'https://rubygems.org'

# core gems
gem 'rails', '5.1'
gem 'webpack-rails'

# Authentication.
gem 'omniauth', '~> 1.6'
gem 'omniauth-facebook', '~> 4.0'
gem 'omniauth-twitter', '~> 1.4'
gem 'omniauth-google-oauth2', '~> 0.5'

# Utility.
gem 'fog-aws' # used by sitemap_generator to store on s3
gem 'high_voltage', '~> 3.0.0'
gem 'impressionist'
gem 'meta-tags'
gem 'pg'
gem 'react_on_rails', '8.0.0'
gem 'rest-client', '~> 2.0.1'
gem 'sentry-raven'
gem 'sitemap_generator'
gem 'surus'
gem 'vimeo', '1.5.4'

group :development do
  gem 'foreman'
  gem 'web-console', '~> 3.0'
end

group :development, :test do
  gem 'byebug'
  gem 'dotenv-rails', '2.0.0'
  gem 'faker', '~> 1.3.0'
  gem 'rubocop-aha'
end

group :test do
  gem 'capybara', '~> 2.3.0'
  gem 'capybara-screenshot', '~> 0.3.19'
  gem 'codeclimate-test-reporter', require: false
  gem 'database_cleaner', '~> 1.6.1'
  gem 'factory_girl_rails', '~> 4.4.1'
  gem 'poltergeist', '~> 1.6.0'
  gem 'rack_session_access', '~> 0.1.1'
  gem 'rails-controller-testing'
  gem 'rspec-json_expectations'
  gem 'rspec-rails', '~> 3.1'
  gem 'simplecov', '~> 0.13.0'
  gem 'webmock', '~> 3.0.1'
end

group :production do
  gem 'passenger'
  gem 'rails_12factor'

  # Use newrelic for monitoring
  gem 'newrelic_rpm'
end
