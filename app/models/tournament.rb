class Tournament < ActiveRecord::Base
  has_many :videos

  scope :year_and_like, lambda { |y, q| where("year = ? and name LIKE ?", y, "%#{q}%") }

  def year_and_name
    "#{year} #{name}"
  end
end
