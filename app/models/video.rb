class Video < ApplicationRecord
  enum debate_type: [:policy, :parli, :lincoln_douglass]
  enum debate_level: [:hs, :college]
  enum provider: [:youtube, :vimeo]

  default_scope { order(created_at: 'desc') }
  scope :live, -> { where(live_now: true) }
  scope :featured, -> { where(is_featured: true) }
  scope :with_debater, -> (d) { joins(aff_team: [:debater_one, :debater_two], neg_team: [:debater_one, :debater_two]).where('debaters.id = ? or debater_ones_teams.id = ? or debater_twos_teams.id = ? or debater_twos_teams_2.id = ?', d.id, d.id, d.id, d.id) }
  scope :with_school, -> (s) { joins(aff_team: :school, neg_team: :school).where('schools.id = ? or schools_teams.id = ?', s.id, s.id) }
  scope :with_team, -> (t) { where('aff_team_id = ? or neg_team_id = ?', t.id, t.id) }

  def self.debate_levels_select
    { 'HS' => 'hs', 'College' => 'college' }
  end

  def self.debate_types_select
    { 'Policy' => 'policy', 'Parli' => 'parli', 'LD' => 'ld' }
  end

  self.per_page = 12

  belongs_to :user
  belongs_to :tournament

  belongs_to :aff_team, class_name: 'Team', foreign_key: :aff_team_id
  belongs_to :neg_team, class_name: 'Team', foreign_key: :neg_team_id

  has_many :tags_videos
  has_many :tags, through: :tags_videos

  serialize :key, Array

  attr_accessor :year, :aff_school, :neg_school, :aff_debater_one, :aff_debater_two, :neg_debater_one, :neg_debater_two, :tags_ids

  def title
    "#{tournament.year_and_name}: #{aff_team.code} vs. #{neg_team.code}"
  end

  def thumbnail
    return nil unless read_attribute(:thumbnail)
    if youtube?
      "https://img.youtube.com/vi/#{key.first}/hqdefault.jpg"
    else
      read_attribute(:thumbnail).sub('200x150', '600x450')
    end
  end

  def team_one
    teams.first
  end

  def team_two
    teams.last
  end

  def to_s
    title
  end
end
