class CreateTeams < ActiveRecord::Migration[4.2]
  def change
    create_table :teams do |t|
      t.belongs_to :school
      t.timestamps null: false
    end
  end
end
