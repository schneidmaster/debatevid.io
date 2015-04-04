class Tournament < ActiveRecord::Base
  has_many :videos

  scope :year_and_like, ->(y, q) { where('year = ? and name LIKE ?', y, "%#{q}%") }

  def year_and_name
    "#{year} #{name}"
  end

  def self.years
    order(year: 'desc').pluck(:year).uniq
  end
end
