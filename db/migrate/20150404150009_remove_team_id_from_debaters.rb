class RemoveTeamIdFromDebaters < ActiveRecord::Migration
  def change
    remove_column :debaters, :team_id
  end
end
