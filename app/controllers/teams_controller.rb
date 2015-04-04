class TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
  end
  
  def autocomplete
    render json: Team.like(params[:q]).map { |team| { id: team.id, text: team.code } }
  end
end
