class JudgeVideo < ActiveRecord::Base
  belongs_to :judge
  belongs_to :video

  def winner
    Team.find(winning_team_id)
  end
end
