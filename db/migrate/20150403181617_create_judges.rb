class CreateJudges < ActiveRecord::Migration[4.2]
  def change
    create_table :judges do |t|
      t.string :first_name
      t.string :last_name
      t.timestamps null: false
    end
  end
end
