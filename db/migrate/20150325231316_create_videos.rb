class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :provider
      t.string :key
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
