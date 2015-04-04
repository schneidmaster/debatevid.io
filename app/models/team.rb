class Team < ActiveRecord::Base
  belongs_to :school

  scope :with_debaters, lambda { |one, two| where("(debater_one_id = ? and debater_two_id = ?) or (debater_one_id = ? and debater_two_id = ?)", one, two, two, one) }
  
  def videos
    Video.where("aff_team_id = ? or neg_team_id = ?", id, id)
  end

  def code
    if debaters.count == 2
      "#{school.name_for_code} #{debaters.first.code_letter}#{debaters.last.code_letter}"
    else
      "#{school.name_for_code} #{debaters.first.code_letter}"
    end
  end
end
