class DebatersController < ApplicationController
  def show
    @debater = Debater.find(params[:id])
    @videos = Video.with_debater(@debater).paginate(page: params[:page])
  end

  def autocomplete
    render json: [] && return unless params[:q]
    if params[:school]
      render json: Debater.school_and_like(params[:school], params[:q]).map { |debater| { id: debater.id, text: debater.name } }
    else
      render json: Debater.like(params[:q]).map { |debater| { id: debater.id, text: debater.name } }
    end
  end
end
