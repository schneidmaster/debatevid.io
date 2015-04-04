class ChangeProviderToEnum < ActiveRecord::Migration
  def up
    change_column :videos, :provider, :integer
  end

  def down
    change_column :videos, :provider, :string
  end
end
