class OneAndTwoForTeams < ActiveRecord::Migration[4.2]
  def change
    add_column :teams, :debater_one_id, :integer
    add_column :teams, :debater_two_id, :integer
  end
end
