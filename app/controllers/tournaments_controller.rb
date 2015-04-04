class TournamentsController < ApplicationController
  def show
    @tournament = Tournament.find(params[:id])
  end

  def autocomplete
    render json: [] && return unless params[:q]
    render json: Tournament.year_and_like(params[:year], params[:q]).map { |tournament| { id: tournament.id, text: tournament.name } }
  end
end
