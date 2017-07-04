class Tag < ApplicationRecord
  has_many :tags_videos
  has_many :videos, through: :tags_videos

  scope :like, ->(q) { where('lower(title) LIKE ?', "%#{q.downcase}%") }

  def to_s
    title
  end
end
