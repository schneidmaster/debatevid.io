class AddLiveNowToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :live_now, :boolean, default: false
  end
end
