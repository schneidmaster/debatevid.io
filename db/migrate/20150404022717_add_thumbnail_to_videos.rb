class AddThumbnailToVideos < ActiveRecord::Migration[4.2]
  def change
    add_column :videos, :thumbnail, :string
  end
end
