class Debater < ActiveRecord::Base
  belongs_to :school

  scope :like, ->(q) { where('first_name LIKE ? or last_name LIKE ?', "%#{q}%", "%#{q}%") }
  scope :school_and_like, ->(s, q) { where('school_id = ? and (first_name LIKE ? or last_name LIKE ?)', s, "%#{q}%", "%#{q}%") }

  def code_letter
    last_name[0]
  end

  def name
    "#{first_name} #{last_name}"
  end

  def to_s
    name
  end
end
