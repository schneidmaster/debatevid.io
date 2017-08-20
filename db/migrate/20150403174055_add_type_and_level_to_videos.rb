class AddTypeAndLevelToVideos < ActiveRecord::Migration[4.2]
  def change
    add_column :videos, :debate_type, :integer
    add_column :videos, :debate_level, :integer
  end
end
