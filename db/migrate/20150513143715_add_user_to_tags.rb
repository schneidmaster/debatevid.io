class AddUserToTags < ActiveRecord::Migration[4.2]
  def change
    add_column :tags_videos, :user_id, :integer
  end
end
