class FavoritesController < ApplicationController
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
