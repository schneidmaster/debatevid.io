class AddIsFeaturedToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :is_featured, :boolean, default: false
  end
end
