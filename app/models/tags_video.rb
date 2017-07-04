class TagsVideo < ApplicationRecord
  belongs_to :tag
  belongs_to :video
  belongs_to :user
end
