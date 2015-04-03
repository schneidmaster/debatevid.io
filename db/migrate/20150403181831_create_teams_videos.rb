class CreateTeamsVideos < ActiveRecord::Migration
  def change
    create_table :teams_videos do |t|
      t.belongs_to :team, index: true
      t.belongs_to :video, index: true
      t.timestamps null: false
    end
  end
end
