class Debater < ApplicationRecord
  belongs_to :school

  def code_letter
    last_name[0]
  end

  def name
    "#{first_name} #{last_name}"
  end

  def name=(name)
    self.first_name, self.last_name = name.split(' ', 2)
  end
end
