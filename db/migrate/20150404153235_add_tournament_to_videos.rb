class AddTournamentToVideos < ActiveRecord::Migration[4.2]
  def change
    add_column :videos, :tournament_id, :integer, index: true
  end
end
