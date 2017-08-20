class RemoveTeamIdFromDebaters < ActiveRecord::Migration[4.2]
  def change
    remove_column :debaters, :team_id
  end
end
