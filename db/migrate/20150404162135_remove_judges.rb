class RemoveJudges < ActiveRecord::Migration
  def change
    drop_table :judges_videos
    drop_table :judges
  end
end
