class FavoritesController < ApplicationController
  before_action :authorize, except: %i[index]

  def index
    video_ids = Video.favorited_by(current_user).pluck(:id)
    @videos = Video.where(id: video_ids)
  end

  def create
    favorite = Favorite.find_or_create_by(user: current_user, video: current_video)
    respond_to do |format|
      format.json do
        render json: favorite
      end
    end
  end

  def destroy
    Favorite.find_by(user: current_user, video: current_video)&.destroy
    head :no_content
  end

  private

  def current_video
    Video.find(params[:video_id])
  end
end
