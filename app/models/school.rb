class School < ActiveRecord::Base
  has_many :teams

  def name_for_code
    short_name || name
  end
end
