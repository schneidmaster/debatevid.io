class TournamentsController < ApplicationController
  before_filter :authorize, except: [:show]

  def index
  end

  def new
    @video = Video.new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def autocomplete
    render json: [] && return unless params[:q]
    render json: Tournament.year_and_like(params[:year], params[:q]).map { |tournament| {id: tournament.id, text: tournament.name} }
  end

  private

  def authorize
    redirect_to [:login] unless logged_in?
  end
end
