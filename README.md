# DebateVid.io

[DebateVid.io](https://debatevid.io) is a centralized repository for parliamentary, policy, and Lincoln-Douglas debate videos. 

## Developing

DebateVid.io is built on Ruby on Rails and Foundation.

### Dependencies

DebateVid.io uses Bower to manage frontend dependencies. You must install [npm](https://github.com/npm/npm) and run `npm install -g bower` to make Bower available for DebateVid.io to use. Then, from the application root, run `rake bower:install` to install Bower dependencies as necessary. (This should also happen automatically before asset precompilation.)

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
