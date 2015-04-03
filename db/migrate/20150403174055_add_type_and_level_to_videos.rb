class AddTypeAndLevelToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :debate_type, :integer
    add_column :videos, :debate_level, :integer
  end
end
