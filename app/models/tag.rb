class Tag < ActiveRecord::Base
  has_and_belongs_to_many :videos

  scope :like, lambda { |q| where("title LIKE ?", "%#{q}%") }
end
