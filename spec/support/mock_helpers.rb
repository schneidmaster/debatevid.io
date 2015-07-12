module Features
  module MockHelpers
    def mock_fb
      OmniAuth.config.add_mock(:facebook, JSON.parse(File.read('spec/fixtures/fb_hash.json')))
    end

    def mock_fb_failure
      OmniAuth.config.mock_auth[:facebook] = :invalid_credentials
    end

    def mock_twitter
      OmniAuth.config.add_mock(:twitter, JSON.parse(File.read('spec/fixtures/twitter_hash.json')))
    end

    def mock_twitter_failure
      OmniAuth.config.mock_auth[:twitter] = :invalid_credentials
    end

    def mock_google
      OmniAuth.config.add_mock(:google_oauth2, JSON.parse(File.read('spec/fixtures/google_hash.json')))
    end

    def mock_google_failure
      OmniAuth.config.mock_auth[:google_oauth2] = :invalid_credentials
    end
  end
end
