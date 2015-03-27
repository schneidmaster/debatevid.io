class Video < ActiveRecord::Base
  belongs_to :user
  belongs_to :tournament
  has_and_belongs_to_many :tags
  serialize :key, Array
  attr_accessor :link
end
