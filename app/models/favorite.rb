class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :video, counter_cache: true

  scope :for_user, ->(user) { where(user: user) }
end
