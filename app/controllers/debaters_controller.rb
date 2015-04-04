class DebatersController < ApplicationController
  def show
    @debater = Debater.find(params[:id])
  end

  def autocomplete
    render json: [] && return unless params[:q]
    render json: Debater.school_and_like(params[:school], params[:q]).map { |debater| { id: debater.id, text: debater.name } }
  end
end
