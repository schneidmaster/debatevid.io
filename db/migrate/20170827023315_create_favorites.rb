class CreateFavorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.belongs_to :user
      t.belongs_to :video

      t.timestamps
    end
  end
end
