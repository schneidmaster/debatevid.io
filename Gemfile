source 'https://rubygems.org'

# core gems
gem 'rails', '4.2.5.1'
gem 'jquery-rails', '4.0.5'
gem 'turbolinks', '2.5.3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'foundation-rails', '~> 5.5.1'

# bower asset packages
source 'https://rails-assets.org' do
  gem 'rails-assets-select2', '3.5.2'
end

group :development do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.2.1'

  gem 'rubocop', '0.29.1'
end

group :test do
  gem 'capybara', '~> 2.3.0'
  gem 'capybara-screenshot', '~> 0.3.19'
  gem 'codeclimate-test-reporter', require: false
  gem 'database_cleaner', '~> 1.3.0'
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

gem 'omniauth', '1.2.2'
gem 'omniauth-facebook', '2.0.1'
gem 'omniauth-twitter', '1.1.0'
gem 'dotenv-rails', '2.0.0'
gem 'omniauth-google-oauth2', '0.2.6'
gem 'simple_form', '3.1.0'
gem 'rest-client', '1.8.0'
gem 'vimeo', '1.5.4'
gem 'draper', '2.1.0'
gem 'activeadmin', '~> 1.0.0.pre1'

gem 'will_paginate', '3.0.7'
gem 'will_paginate-foundation', '5.3.4'
