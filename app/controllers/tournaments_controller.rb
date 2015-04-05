class TournamentsController < ApplicationController
  def show
    @tournament = Tournament.find(params[:id])
    @videos = @tournament.videos.paginate(page: params[:page])
  end

  def autocomplete
    render json: [] && return unless params[:q]
    if params[:year]
      render json: Tournament.year_and_like(params[:year], params[:q]).map { |tournament| { id: tournament.id, text: tournament.name } }
    else
      render json: Tournament.like(params[:q]).map { |tournament| { id: tournament.id, text: tournament.year_and_name } }
    end
  end
end
