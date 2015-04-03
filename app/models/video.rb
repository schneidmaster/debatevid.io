class Video < ActiveRecord::Base
  enum debate_type: [ :policy, :parli, :ld ]
  enum debate_level: [ :hs, :college ]

  belongs_to :user
  belongs_to :tournament
  
  has_many :teams
  has_many :judges_videos
  has_many :judges, through: :judges_videos
  has_and_belongs_to_many :tags

  serialize :key, Array

  def team_one
    teams.first
  end

  def team_two
    teams.last
  end

  def team_ballots(num)
    team_ballots = 0
    for judge in judges_videos
      if num = 1
        team_ballots++ if judge.winner == team_one
      else
        team_ballots++ if judge.winner == team_two
      end
    end
    team_ballots
  end

  def winner
    if team_ballots(1) > team_ballots(2)
      team_one
    else
      team_two
    end
  end
end
