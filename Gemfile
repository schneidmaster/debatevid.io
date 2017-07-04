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
gem 'draper', '~> 3.0'
gem 'high_voltage', '~> 3.0.0'
gem 'meta-tags'
gem 'rest-client', '1.8.0'
gem 'vimeo', '1.5.4'
gem 'will_paginate', '~> 3.1'

group :development do
  gem 'sqlite3'
  gem 'web-console', '~> 3.0'
end

group :development, :test do
  gem 'byebug'
  gem 'dotenv-rails', '2.0.0'
  gem 'rubocop', '~> 0.49'
end

group :test do
  gem 'capybara', '~> 2.3.0'
  gem 'capybara-screenshot', '~> 0.3.19'
  gem 'codeclimate-test-reporter', require: false
  gem 'database_cleaner', '~> 1.6.1'
  gem 'factory_girl_rails', '~> 4.4.1'
  gem 'faker', '~> 1.3.0'
  gem 'poltergeist', '~> 1.6.0'
  gem 'rack_session_access', '~> 0.1.1'
  gem 'rspec-rails', '~> 3.1'
  gem 'simplecov', '~> 0.10.0'
  gem 'webmock', '~> 1.18.0'
end

group :production do
  gem 'pg'
  gem 'passenger'
  gem 'rails_12factor'

  # Use newrelic for monitoring
  gem 'newrelic_rpm'
end
