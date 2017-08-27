class TagsController < ApplicationController
  before_action :authorize, except: %i[show]

  def show
    @tag = Tag.find_by(title: params[:id])
    @videos = @tag.videos
  end

  def create
    video = Video.find(params[:video_id])
    id_or_title = tag_params[:title]
    tag = Tag.find_by(id: id_or_title) || Tag.find_or_create_by(title: id_or_title)
    TagsVideo.create(user: current_user, tag: tag, video: video) unless video.tags_videos.exists?(tag_id: tag.id)
    render json: tag
  end

  private

  def tag_params
    params.require(:tag).permit(:title)
  end
end
