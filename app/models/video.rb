class Video < ActiveRecord::Base
  enum debate_type: [:policy, :parli, :ld]
  enum debate_level: [:hs, :college]

  belongs_to :user
  belongs_to :tournament

  belongs_to :aff_team, class_name: 'Team', foreign_key: :aff_team_id
  belongs_to :neg_team, class_name: 'Team', foreign_key: :neg_team_id

  has_many :judges_videos
  has_many :judges, through: :judges_videos
  has_and_belongs_to_many :tags

  serialize :key, Array

  attr_accessor :aff_debater_one, :aff_debater_two, :neg_debater_one, :neg_debater_two

  def team_one
    teams.first
  end

  def team_two
    teams.last
  end

  def team_one_ballots
    team_ballots = 0
    for judge in judges_videos
      team_ballots += 1 if judge.winner == team_one
    end
    team_ballots
  end

  def team_two_ballots
    team_ballots = 0
    for judge in judges_videos
      team_ballots += 1 if judge.winner == team_two
    end
    team_ballots
  end

  def winner
    if team_one_ballots > team_two_ballots
      team_one
    else
      team_two
    end
  end
end
