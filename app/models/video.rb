class Video < ActiveRecord::Base
  enum debate_type: [:policy, :parli, :lincoln_douglass]
  enum debate_level: [:hs, :college]
  enum provider: [:youtube, :vimeo]

  def self.debate_levels_select
    { "HS" => "hs", "College" => "college" }
  end

  def self.debate_types_select
    { "Policy" => "policy", "Parli" => "parli", "LD" => "ld" }
  end

  belongs_to :user
  belongs_to :tournament

  belongs_to :aff_team, class_name: 'Team', foreign_key: :aff_team_id
  belongs_to :neg_team, class_name: 'Team', foreign_key: :neg_team_id

  has_and_belongs_to_many :tags

  serialize :key, Array

  attr_accessor :year, :aff_school, :neg_school, :aff_debater_one, :aff_debater_two, :neg_debater_one, :neg_debater_two, :tags_ids

  def title
    "#{tournament.year_and_name}: #{aff_team.code} vs. #{neg_team.code}"
  end

  def team_one
    teams.first
  end

  def team_two
    teams.last
  end
end
