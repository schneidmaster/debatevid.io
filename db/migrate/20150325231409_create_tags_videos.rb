class CreateTagsVideos < ActiveRecord::Migration
  def change
    create_table :tags_videos do |t|
      t.belongs_to :tag
      t.belongs_to :video
    end
  end
end
