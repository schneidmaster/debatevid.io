class VideosController < ApplicationController
  before_action :authorize, except: %i[show]

  def show
    @video = Video.find(params[:id]).decorate
    impressionist(@video)
  end

  def new
    @video = Video.new
  end

  def create
    video = current_user.videos.new(video_params)
    response = if video.save
      video
    else
      video.errors
    end

    respond_to do |format|
      format.json { render json: response }
    end
  end

  def add_tags
    video = Video.find(params[:video_id])

    find_or_create_tags(params[:add_tag][:tags_ids]).each do |tag|
      TagsVideo.create(tag: tag, video: video, user: current_user) unless video.tags.include?(tag)
    end

    redirect_to video_path(video)
  end

  def info
    info = VideoInformationService.link_info(params[:link])
    provider = Video.providers[info[:provider]]
    info = { exists: true } if Video.where('videos.provider = ? and videos.key like ?', provider, "%#{info[:key]}%").count.positive?
    render json: info
  end

  private

  def video_params
    debater_attr_keys = [
      :debater_one_id,
      :debater_two_id,
      :school_id,
      debater_one_attributes: %i[name school_id],
      debater_two_attributes: %i[name school_id],
      school_attributes: [:name],
    ]
    params.require(:video).permit(:debate_type, :debate_level, :tournament_id, aff_team_attributes: debater_attr_keys, neg_team_attributes: debater_attr_keys, tournament_attributes: [:name], tags_videos_attributes: [:tag_id, tags_attributes: %i[id title]], segments: %i[key provider thumbnail])
  end
end
