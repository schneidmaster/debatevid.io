class School < ActiveRecord::Base
  has_many :teams

  scope :like, ->(q) { where('name LIKE ? or short_name LIKE ?', "%#{q}%", "%#{q}%") }

  def name_for_code
    short_name || name
  end

  def to_s
    name
  end
end
