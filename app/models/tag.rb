class Tag < ActiveRecord::Base
  has_many :tags_videos
  has_many :videos, through: :tags_videos

  scope :like, ->(q) { where('title LIKE ?', "%#{q}%") }

  def to_s
    title
  end
end
