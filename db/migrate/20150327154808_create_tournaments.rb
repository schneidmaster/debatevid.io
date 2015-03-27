class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
      t.integer :year
      t.string :name
      t.timestamps null: false
    end
  end
end
