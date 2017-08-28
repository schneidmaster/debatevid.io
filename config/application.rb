require File.expand_path('../boot', __FILE__)

require 'rails'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_view/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DebatevidIo
  class Application < Rails::Application
    config.exceptions_app = routes

    # Use public/assets rather than public/webpack
    config.webpack.output_dir = 'public/assets'
    config.webpack.public_path = 'assets'
    config.webpack.manifest_filename = 'webpack_manifest.json'
    config.webpack.dev_server.manifest_host = ENV.fetch('WEBPACK_DEV_HOST', 'lvh.me')
    config.webpack.dev_server.manifest_port = 3808
    config.webpack.dev_server.host = ENV.fetch('WEBPACK_DEV_HOST', 'lvh.me')
    config.webpack.dev_server.port = 3808
    config.webpack.dev_server.enabled = Rails.env.development?
  end
end
