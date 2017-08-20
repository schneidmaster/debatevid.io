class AddIsFeaturedToVideos < ActiveRecord::Migration[4.2]
  def change
    add_column :videos, :is_featured, :boolean, default: false
  end
end
