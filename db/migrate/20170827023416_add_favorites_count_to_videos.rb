class AddFavoritesCountToVideos < ActiveRecord::Migration[5.1]
  def change
    add_column :videos, :favorites_count, :integer, default: 0
  end
end
