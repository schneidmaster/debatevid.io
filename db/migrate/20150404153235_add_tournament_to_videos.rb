class AddTournamentToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :tournament_id, :integer, index: true
  end
end
