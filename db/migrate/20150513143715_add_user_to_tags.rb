class AddUserToTags < ActiveRecord::Migration
  def change
    add_column :tags_videos, :user_id, :integer
  end
end
