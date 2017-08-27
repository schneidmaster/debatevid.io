class Video < ApplicationRecord
  enum debate_type: %i[policy parli lincoln_douglass]
  enum debate_level: %i[hs college]
  enum provider: %i[youtube vimeo]

  default_scope { order(created_at: 'desc') }
  scope :live, -> { where(live_now: true) }
  scope :featured, -> { where(is_featured: true) }
  scope :with_debater, ->(d) { joins(aff_team: %i[debater_one debater_two], neg_team: %i[debater_one debater_two]).where('debaters.id = ? or debater_ones_teams.id = ? or debater_twos_teams.id = ? or debater_twos_teams_2.id = ?', d.id, d.id, d.id, d.id) }
  scope :with_school, ->(s) { joins(aff_team: :school, neg_team: :school).where('schools.id = ? or schools_teams.id = ?', s.id, s.id) }
  scope :with_team, ->(t) { where(aff_team_id: t.id).or(where(neg_team_id: t.id)) }
  scope :favorited_by, ->(u) { joins(:favorites).where(favorites: { user_id: u.id }) }

  def self.debate_levels_select
    { 'HS' => debate_levels[:hs], 'College' => debate_levels[:college] }
  end

  def self.debate_types_select
    { 'Policy' => debate_types[:policy], 'Parli' => debate_types[:parli], 'LD' => debate_types[:lincoln_douglass] }
  end

  belongs_to :user
  belongs_to :tournament

  validates :debate_type, :debate_level, :user, :aff_team, :neg_team, :tournament, :provider, :key, presence: true

  belongs_to :aff_team, class_name: 'Team', foreign_key: :aff_team_id
  belongs_to :neg_team, class_name: 'Team', foreign_key: :neg_team_id

  has_many :favorites
  has_many :tags_videos
  has_many :tags, through: :tags_videos

  accepts_nested_attributes_for :tournament, :aff_team, :neg_team, :tags_videos

  serialize :key, Array

  is_impressionable counter_cache: true, column_name: :views

  def title
    "#{tournament.year_and_name}: #{aff_team.code} vs. #{neg_team.code}"
  end

  def segments=(attrs)
    self.provider = attrs.first[:provider]
    self.thumbnail = attrs.first[:thumbnail]
    self.key = attrs.map { |segment| segment[:key] }
  end

  def autosave_associated_records_for_aff_team
    return if aff_team.nil?
    team = Team.with_debaters(aff_team.debater_one, aff_team.debater_two).find_by(school: aff_team.school)
    team = Team.create(school: aff_team.school, debater_one: aff_team.debater_one, debater_two: aff_team.debater_two) if team.nil?
    self.aff_team = team
  end

  def autosave_associated_records_for_neg_team
    return if neg_team.nil?
    team = Team.with_debaters(neg_team.debater_one, neg_team.debater_two).find_by(school: neg_team.school)
    team = Team.create(school: neg_team.school, debater_one: neg_team.debater_one, debater_two: neg_team.debater_two) if team.nil?
    self.neg_team = team
  end
end
