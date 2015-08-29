class Debater < ActiveRecord::Base
  belongs_to :school

  scope :like, ->(q) { where('lower(first_name) LIKE ? or lower(last_name) LIKE ?', "%#{q.downcase}%", "%#{q.downcase}%") }
  scope :school_and_like, ->(s, q) { where('school_id = ? and (lower(first_name) LIKE ? or lower(last_name) LIKE ?)', s, "%#{q.downcase}%", "%#{q.downcase}%") }

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
