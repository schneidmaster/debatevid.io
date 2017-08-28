class Tag < ApplicationRecord
  has_many :tags_videos
  has_many :videos, through: :tags_videos

  validates :title, presence: true

  before_validation :downcase_title

  private

  def downcase_title
    title&.downcase!
  end
end
