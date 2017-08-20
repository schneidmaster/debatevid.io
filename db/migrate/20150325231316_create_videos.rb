class CreateVideos < ActiveRecord::Migration[4.2]
  def change
    create_table :videos do |t|
      t.string :provider
      t.string :key
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
