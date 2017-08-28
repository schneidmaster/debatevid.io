class ChangeProviderToEnum < ActiveRecord::Migration[4.2]
  def up
    change_column :videos, :provider, 'integer USING CAST(provider AS integer)'
  end

  def down
    change_column :videos, :provider, :string
  end
end
