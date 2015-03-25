class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :firstname
      t.string :lastname
      t.string :avatar
      t.timestamps null: false
    end
  end
end
