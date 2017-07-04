class Tournament < ApplicationRecord
  has_many :videos

  scope :like, ->(q) { where('lower(name) LIKE ?', "%#{q.downcase}%") }
  scope :year_and_like, ->(y, q) { where('year = ? and lower(name) LIKE ?', y, "%#{q.downcase}%") }

  def year_and_name
    "#{year} #{name}"
  end

  def self.years
    order(year: 'desc').pluck(:year).uniq
  end

  def to_s
    year_and_name
  end
end
