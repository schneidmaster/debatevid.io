class VideosController < ApplicationController
  before_filter :authorize, except: [:show]

  def index
  end

  def show
    @video = Video.find(params[:id])
  end

  def new
    @video = Video.new
  end

  def create
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
      if Tag.exists?(tag)
        tag
      else
        Tag.create(title: tag)
      end
    end

    keys = param(:key).split(",").reject!(&:empty?)

    video = Video.create(provider: param(:provider), key: keys, user: current_user, debate_level: param(:debate_level), debate_type: param(:debate_type), aff_team: aff_team, neg_team: neg_team)
      
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
      Team.create(debater_one_id: debater_one, debater_two_id: debater_two, school: school)
    end
  end
end
