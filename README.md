[![Build Status](https://circleci.com/gh/schneidmaster/debatevid.io.svg?style=shield)](https://circleci.com/gh/schneidmaster/debatevid.io)
[![Test Coverage](https://codeclimate.com/github/schneidmaster/debatevid.io/badges/coverage.svg)](https://codeclimate.com/github/schneidmaster/debatevid.io/coverage)
[![Code Climate](https://codeclimate.com/github/schneidmaster/debatevid.io/badges/gpa.svg)](https://codeclimate.com/github/schneidmaster/debatevid.io)
[![security](https://hakiri.io/github/schneidmaster/debatevid.io/master.svg)](https://hakiri.io/github/schneidmaster/debatevid.io/master)

# DebateVid.io

[DebateVid.io](https://debatevid.io) is a centralized repository for parliamentary, policy, and Lincoln-Douglas debate videos. 

## Developing

DebateVid.io is built on Ruby on Rails.

### Configuration

DebateVid.io uses [dotenv](https://github.com/bkeepers/dotenv) to manage configuration. Specifically, client IDs and secret keys for Facebook, Twitter, and Google as well as the API key for YouTube are kept in a local file excluded from the Git repository. To set up your application for development, you need to first create test applications on the [Facebook](https://developers.facebook.com/apps), [Twitter](https://apps.twitter.com/), and [Google](https://console.developers.google.com/) developer portals. Then, generate the appropriate keys and create a file named `.env` in the application root directory with the following contents:

```
FACEBOOK_KEY=################
FACEBOOK_SECRET=################
TWITTER_KEY=################
TWITTER_SECRET=################
GOOGLE_KEY=################
GOOGLE_SECRET=################
YOUTUBE_DEV_KEY=################
```

In the production environment, the Rails secret key base and database password are also kept in `.env`:

```
SECRET_KEY_BASE=################
DB_PASSWORD=################
```

## Contributing

1. Fork it ( https://github.com/schneidmaster/debatevid.io/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

MIT

