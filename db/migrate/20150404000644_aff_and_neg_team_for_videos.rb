class AffAndNegTeamForVideos < ActiveRecord::Migration[4.2]
  def change
    drop_table :teams_videos

    add_column :videos, :aff_team_id, :integer
    add_column :videos, :neg_team_id, :integer
  end
end
