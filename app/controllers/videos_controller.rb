class VideosController < ApplicationController
  before_filter :authorize, except: [:show, :search]

  def show
    @video = Video.find(params[:id]).decorate
  end

  def new
    @video = Video.new
  end

  def create
    # Ensure all fields are present.
    if param(:tournament).blank? || param(:aff_school).blank? || param(:neg_school).blank? ||
       param(:aff_debater_one).blank? || param(:neg_debater_one).blank? ||
       param(:year).blank? || param(:tournament).blank? ||
       param(:debate_level).blank? || param(:debate_type).blank?
      redirect_to new_video_path, alert: 'You must complete all required fields.'
      return
    end

    # Find or create tournament.
    tournament = find_or_create_tournament(param(:tournament))

    # Find or create schools.
    aff_school = find_or_create_school(param(:aff_school))
    neg_school = find_or_create_school(param(:neg_school))

    # Find or create debaters.
    aff_debater_one = find_or_create_debater(param(:aff_debater_one), aff_school)
    aff_debater_two = find_or_create_debater(param(:aff_debater_two), aff_school)
    neg_debater_one = find_or_create_debater(param(:neg_debater_one), neg_school)
    neg_debater_two = find_or_create_debater(param(:neg_debater_two), neg_school)

    # Find or create teams.
    aff_team = find_or_create_team(aff_debater_one, aff_debater_two, aff_school)
    neg_team = find_or_create_team(neg_debater_one, neg_debater_two, neg_school)

    tags = find_or_create_tags(param(:tags_ids))

    keys = param(:key).split(',').reject!(&:empty?)

    video = Video.create(provider: param(:provider), key: keys, thumbnail: param(:thumbnail), user: current_user, debate_level: param(:debate_level), debate_type: param(:debate_type), tournament: tournament, tags: tags, aff_team: aff_team, neg_team: neg_team)

    redirect_to video_path(video)
  end

  def add_tags
    video = Video.find(params[:video_id])

    find_or_create_tags(params[:add_tag][:tags_ids]).each do |tag|
      video.tags << tag unless video.tags.include?(tag)
    end

    redirect_to video_path(video)
  end

  def info
    info = VideoInformationService.link_info(params[:link])
    provider = Video.providers[info[:provider]]
    info = { exists: true } if Video.where('videos.provider = ? and videos.key like ?', provider, "%#{info[:key]}%").count > 0
    render json: info
  end

  def search
    videos = Video.all
    
    videos = videos.send(search_param(:debate_level)) if search_param(:debate_level)
    videos = videos.send(search_param(:debate_type)) if search_param(:debate_type)
    videos = videos.joins(:tournament).where('tournaments.year = ?', search_param(:year)) if search_param(:year)
    videos = videos.where(tournament: search_param(:tournament)) if search_param(:tournament)
    videos = videos.joins(aff_team: :school).joins(neg_team: :school).where('schools.id = ? or schools_teams.id = ?', search_param(:school), search_param(:school)) if search_param(:school)
    videos = videos.where('aff_team_id = ? or neg_team_id = ?', search_param(:team), search_param(:team)) if search_param(:team)
    videos = videos.joins(aff_team: [:debater_one, :debater_two]).joins(neg_team:  [:debater_one, :debater_two]).where('debaters.id = ? or debater_ones_teams.id = ? or debater_twos_teams.id = ? or debater_twos_teams_2.id = ?', search_param(:debater), search_param(:debater), search_param(:debater), search_param(:debater)) if search_param(:debater)
    videos = videos.joins(:tags).where('tags.id = ?', search_param(:tag)) if search_param(:tag)
    
    render partial: "videos/table", locals: { videos: videos, no_paginate: true }
    return
  end

  private

  def authorize
    redirect_to [:login] unless logged_in?
  end
  
  def search_param(key)
    params[:data][key]
  end

  def param(key)
    params[:video][key]
  end

  def find_or_create_tournament(id_or_name)
    if Tournament.exists?(id_or_name)
      Tournament.find(id_or_name)
    elsif Tournament.where(year: year, name: id_or_name).count > 0
      Tournament.find_by(year: year, name: id_or_name)
    else
      Tournament.create(year: param(:year), name: id_or_name)
    end
  end

  def find_or_create_school(id_or_name)
    if School.exists?(id_or_name)
      School.find(id_or_name)
    elsif School.where(name: id_or_name).count > 0
      School.find_by(name: id_or_name)
    else
      School.create(name: id_or_name)
    end
  end

  def find_or_create_debater(id_or_name, school)
    if Debater.exists?(id_or_name)
      Debater.find(id_or_name)
    else
      name = id_or_name.split(' ')
      first_name = name.shift
      last_name = name.join(' ')
      if Debater.where(school: school, first_name: first_name, last_name: last_name).count > 0
        Debater.find_by(school: school, first_name: first_name, last_name: last_name)
      else
        Debater.create(first_name: first_name, last_name: last_name, school: school)
      end
    end
  end

  def find_or_create_team(debater_one, debater_two, school)
    if Team.with_debaters(debater_one, debater_two).count > 0
      Team.with_debaters(debater_one, debater_two).first
    else
      # Ensure debaters are alphabetically ordered.
      if debater_two.last_name < debater_one.last_name
        tmp = debater_one
        debater_one = debater_two
        debater_two = tmp
      end
      Team.create(debater_one_id: debater_one.id, debater_two_id: debater_two.id, school: school)
    end
  end

  def find_or_create_tags(tags_ids)
    tags_ids.split(',').map do |tag|
      next if tag.blank?
      if Tag.exists?(tag)
        Tag.find(tag)
      elsif Tag.where(title: tag.downcase).count > 0
        Tag.find_by_title(tag.downcase)
      else
        Tag.create(title: tag.downcase)
      end
    end
  end
end
