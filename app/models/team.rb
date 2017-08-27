class Team < ApplicationRecord
  belongs_to :school

  belongs_to :debater_one, class_name: 'Debater', foreign_key: :debater_one_id
  belongs_to :debater_two, class_name: 'Debater', foreign_key: :debater_two_id

  before_validation :sort_debaters

  scope :with_debaters, ->(one, two) { where(debater_one: one, debater_two: two).or(where(debater_one: two, debater_two: one)) }

  accepts_nested_attributes_for :debater_one, :debater_two, :school

  def code
    if debater_two
      "#{school.name_for_code} #{debater_one.code_letter}#{debater_two.code_letter}"
    else
      "#{school.name_for_code} #{debater_one.code_letter}"
    end
  end

  private

  def sort_debaters
    return unless debater_two && debater_two.last_name < debater_one.last_name
    tmp = debater_one
    self.debater_one = debater_two
    self.debater_two = tmp
  end
end
