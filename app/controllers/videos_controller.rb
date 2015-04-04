class VideosController < ApplicationController
  before_filter :authorize, except: [:show]

  def index
  end

  def show
    @video = Video.find(params[:id]).decorate
  end

  def new
    @video = Video.new
  end

  def create
    # Ensure all fields are present.
    if param(:tournament).blank? || param(:aff_school).blank? || param(:neg_school).blank? ||
      param(:aff_debater_one).blank? || param(:aff_debater_two).blank? || param(:neg_debater_one).blank? ||
      param(:neg_debater_two).blank? || param(:year).blank? || param(:tournament).blank? || 
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

    tags = param(:tags_ids).split(",").map do |tag|
      next if tag.blank?
      if Tag.exists?(tag)
        tag
      else
        Tag.create(title: tag)
      end
    end

    keys = param(:key).split(",").reject!(&:empty?)

    video = Video.create(provider: param(:provider), key: keys, user: current_user, debate_level: param(:debate_level), debate_type: param(:debate_type), tournament: tournament, aff_team: aff_team, neg_team: neg_team)
      
    redirect_to video_path(video)
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def info
    render json: VideoInformationService.link_info(params[:link])
  end

  private

  def authorize
    redirect_to [:login] unless logged_in?
  end

  def param(key)
    params[:video][key]
  end

  def find_or_create_tournament(id_or_key)
    if Tournament.exists?(id_or_key)
      Tournament.find(id_or_key)
    else
      Tournament.create(year: param(:year), name: id_or_key)
    end
  end

  def find_or_create_school(id_or_key)
    if School.exists?(id_or_key)
      School.find(id_or_key)
    else
      School.create(name: id_or_key)
    end
  end

  def find_or_create_debater(id_or_key, school)
    if Debater.exists?(id_or_key)
      Debater.find(id_or_key)
    else
      name = id_or_key.split(" ")
      first_name = name.shift
      last_name = name.join(" ")
      Debater.create(first_name: first_name, last_name: last_name, school: school)
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
end
