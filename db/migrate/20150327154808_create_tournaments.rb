class CreateTournaments < ActiveRecord::Migration[4.2]
  def change
    create_table :tournaments do |t|
      t.integer :year
      t.string :name
      t.timestamps null: false
    end
  end
end
