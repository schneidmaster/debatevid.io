class Tournament < ApplicationRecord
  has_many :videos

  def year_and_name
    "#{year} #{name}"
  end

  def self.years
    order(year: 'desc').pluck(:year).uniq
  end
end
