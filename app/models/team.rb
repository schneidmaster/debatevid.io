class Team < ActiveRecord::Base
  belongs_to :school

  belongs_to :debater_one, class_name: 'Debater', foreign_key: :debater_one_id
  belongs_to :debater_two, class_name: 'Debater', foreign_key: :debater_two_id

  scope :with_debaters, ->(one, two) { where('(debater_one_id = ? and debater_two_id = ?) or (debater_one_id = ? and debater_two_id = ?)', one, two, two, one) }
  
  scope :like, ->(q) { joins(:debater_one, :debater_two).where('debaters.first_name like ? or debaters.last_name like ? or debater_twos_teams.first_name like ? or debater_twos_teams.last_name like ?', "%#{q}%", "%#{q}%", "%#{q}%", "%#{q}%") }

  def debater_one
    Debater.find(debater_one_id) if Debater.exists?(debater_one_id)
  end

  def debater_two
    Debater.find(debater_two_id) if Debater.exists?(debater_two_id)
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

  def code_with_names
    "#{school.name_for_code} #{debater_names}"
  end

  def to_s
    code
  end
end
