class School < ApplicationRecord
  has_many :teams

  scope :like, ->(q) { where('lower(name) LIKE ? or lower(short_name) LIKE ?', "%#{q.downcase}%", "%#{q.downcase}%") }

  def name_for_code
    short_name || name
  end

  def to_s
    name
  end
end
