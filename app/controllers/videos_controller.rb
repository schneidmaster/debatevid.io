class VideosController < ApplicationController
  before_action :authorize, except: %i[show]

  def show
    @video = Video.find(params[:id])
    impressionist(@video)
  end

  def new
    @video = Video.new
  end

  def create
    video = current_user.videos.new(video_params)
    if video.save
      render json: video
    else
      render json: video.errors, status: :unprocessable_entity
    end
  end

  def info
    info = VideoInformationService.link_info(params[:link])
    provider = Video.providers[info[:provider]]
    info = { exists: true } if Video.where(provider: provider).where('key ILIKE ?', "%#{info[:key]}%").any?
    render json: info
  end

  private

  def video_params
    team_attr_keys = [
      :debater_one_id,
      :debater_two_id,
      :school_id,
      debater_one_attributes: %i[name school_id],
      debater_two_attributes: %i[name school_id],
      school_attributes: [:name],
    ]
    params.require(:video).permit(:debate_type, :debate_level, :tournament_id, aff_team_attributes: team_attr_keys, neg_team_attributes: team_attr_keys, tournament_attributes: %i[name year], tags_videos_attributes: [:tag_id, tag_attributes: %i[id title]], segments: %i[key provider thumbnail])
  end
end
