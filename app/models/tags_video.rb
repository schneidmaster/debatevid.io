class TagsVideo < ApplicationRecord
  belongs_to :tag
  belongs_to :video
  belongs_to :user

  accepts_nested_attributes_for :tag
end
