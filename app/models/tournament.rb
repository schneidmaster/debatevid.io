class Tournament < ApplicationRecord
  has_many :videos

  def year_and_name
    "#{year} #{name}"
  end
end
