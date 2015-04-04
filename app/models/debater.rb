class Debater < ActiveRecord::Base
  belongs_to :school

  scope :school_and_like, lambda { |s, q| where("school_id = ? and (first_name LIKE ? or last_name LIKE ?)", s, "%#{q}%", "%#{q}%") }

  def teams
    Team.where("debater_one_id = ? or debater_two_id = ?", id, id)
  end

  def code_letter
    last_name[0]
  end

  def name
    "#{first_name} #{last_name}"
  end
end
