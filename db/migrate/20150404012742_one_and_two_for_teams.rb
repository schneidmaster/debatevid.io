class OneAndTwoForTeams < ActiveRecord::Migration
  def change
    add_column :teams, :debater_one_id, :integer
    add_column :teams, :debater_two_id, :integer
  end
end
