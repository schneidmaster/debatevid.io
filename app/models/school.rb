class School < ApplicationRecord
  has_many :debaters
  has_many :teams

  def name_for_code
    short_name || name
  end
end
