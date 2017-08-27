class Tag < ApplicationRecord
  has_many :tags_videos
  has_many :videos, through: :tags_videos
end
