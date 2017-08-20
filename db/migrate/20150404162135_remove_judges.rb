class RemoveJudges < ActiveRecord::Migration[4.2]
  def change
    drop_table :judges_videos
    drop_table :judges
  end
end
