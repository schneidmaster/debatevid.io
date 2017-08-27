class User < ApplicationRecord
  has_many :favorites
  has_many :videos

  class << self
    def find_or_create_from_auth_hash(auth_hash)
      user = User.find_or_create_by provider: auth_hash[:provider], uid: auth_hash[:uid]
      user.avatar = auth_hash[:info][:image].sub('http://', 'https://')

      user.name =
        if auth_hash[:info][:first_name]
          "#{auth_hash[:info][:first_name]} #{auth_hash[:info][:last_name]}"
        else
          auth_hash[:info][:name]
        end

      user.save!
      user
    end
  end
end
