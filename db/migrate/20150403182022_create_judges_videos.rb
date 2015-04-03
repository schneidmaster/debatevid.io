class CreateJudgesVideos < ActiveRecord::Migration
  def change
    create_table :judges_videos do |t|
      t.belongs_to :judge, index: true
      t.belongs_to :video, index: true
      t.integer :winning_team_id
      t.timestamps null: false
    end
  end
end
