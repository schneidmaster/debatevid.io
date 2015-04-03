class CreateDebaters < ActiveRecord::Migration
  def change
    create_table :debaters do |t|
      t.belongs_to :team
      t.belongs_to :school
      t.string :first_name
      t.string :last_name
      t.timestamps null: false
    end
  end
end
