class TagsVideo < ActiveRecord::Base
  belongs_to :tag
  belongs_to :video
  belongs_to :user
end
