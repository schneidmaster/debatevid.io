class CreateTagsVideos < ActiveRecord::Migration[4.2]
  def change
    create_table :tags_videos do |t|
      t.belongs_to :tag
      t.belongs_to :video
    end
  end
end
