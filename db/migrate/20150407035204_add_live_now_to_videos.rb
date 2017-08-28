class AddLiveNowToVideos < ActiveRecord::Migration[4.2]
  def change
    add_column :videos, :live_now, :boolean, default: false
  end
end
