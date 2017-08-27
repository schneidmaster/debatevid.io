require 'simplecov'

SimpleCov.start 'rails'

ENV['RAILS_ENV'] = 'test'
require File.expand_path('../../config/environment', __FILE__)

require 'rspec/rails'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'capybara/poltergeist'
require 'webmock/rspec'
require 'rack_session_access/capybara'
require 'byebug'

WebMock.disable_net_connect!(allow_localhost: true, allow: %w[lvh.me])

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

OmniAuth.config.test_mode = true
OmniAuth.config.logger = Rails.logger

RSpec.configure do |config|
  config.infer_spec_type_from_file_location!

  # Include FactoryGirl helper methods
  config.include FactoryGirl::Syntax::Methods

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = Rails.root.join('spec', 'fixtures')

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = 'random'

  # Include custom helpers
  config.include Controllers::AuthenticationHelpers, type: :controller
  config.include Features::MockHelpers, type: :feature
  config.include Features::SessionHelpers, type: :feature

  # Set up Capybara
  Capybara.configure do |capy|
    capy.register_driver :poltergeist do |app|
      Capybara::Poltergeist::Driver.new(app)
    end
    capy.javascript_driver = :poltergeist
    capy.server_port = 5000
  end

  config.before(:suite) do
    DatabaseCleaner.clean_with :truncation
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  # Start webpack server if needed.
  config.add_setting :webpack_dev_server_pid

  config.when_first_matching_example_defined(:needs_assets) do
    # Start webpack-dev-server unless in CI or it is already running
    next if ENV['CI'] == 'true' || system('lsof -i:3808', out: '/dev/null')

    config.webpack_dev_server_pid = fork do
      puts 'Child process starting webpack-dev-server...'
      exec 'TARGET=development ./node_modules/.bin/webpack-dev-server --config config/webpack.babel.js --quiet'
    end
  end

  config.after(:suite) do
    next unless config.webpack_dev_server_pid
    puts 'Killing webpack-dev-server'
    Process.kill('HUP', config.webpack_dev_server_pid)
    begin
      Timeout.timeout(2) do
        Process.wait(config.webpack_dev_server_pid, 0)
      end
    rescue Timeout::Error
      Process.kill(9, config.webpack_dev_server_pid)
    ensure
      config.webpack_dev_server_pid = nil
    end
  end
end
