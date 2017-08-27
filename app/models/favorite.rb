class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :video

  scope :for_user, ->(user) { where(user: user) }
end
