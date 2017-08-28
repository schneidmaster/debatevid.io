class TournamentsController < ApplicationController
  def show
    @tournament = Tournament.find(params[:id])
    @videos = @tournament.videos
  end
end
