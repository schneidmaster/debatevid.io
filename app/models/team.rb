class Team < ActiveRecord::Base
  belongs_to :school
  has_many :debaters, -> { order 'debaters.last_name' }
  has_many :videos

  def code
    if debaters.count == 2
      "#{school.name_for_code} #{debaters.first.code_letter}#{debaters.last.code_letter}"
    else
      "#{school.name_for_code} #{debaters.first.code_letter}"
    end
end
