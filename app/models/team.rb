class Team < ActiveRecord::Base
  belongs_to :school

  belongs_to :debater_one, class_name: 'Debater', foreign_key: :debater_one_id
  belongs_to :debater_two, class_name: 'Debater', foreign_key: :debater_two_id

  scope :with_debaters, lambda { |one, two| where("(debater_one_id = ? and debater_two_id = ?) or (debater_one_id = ? and debater_two_id = ?)", one, two, two, one) }

  def debater_one
    if Debater.exists?(debater_one_id)
      Debater.find(debater_one_id)
    else
      nil
    end
  end

  def debater_two
    if Debater.exists?(debater_two_id)
      Debater.find(debater_two_id)
    else
      nil
    end
  end
  
  def videos
    Video.where("aff_team_id = ? or neg_team_id = ?", id, id)
  end

  def code
    if debater_two
      "#{school.name_for_code} #{debater_one.code_letter}#{debater_two.code_letter}"
    else
      "#{school.name_for_code} #{debater_one.code_letter}"
    end
  end

  def debater_names
    "#{debater_one.name} & #{debater_two.name}"
  end
end
