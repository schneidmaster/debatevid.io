class TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
    @videos = Video.with_team(@team).paginate(page: params[:page])
  end
  
  def autocomplete
    render json: Team.like(params[:q]).map { |team| { id: team.id, text: team.code_with_names } }
  end
end
