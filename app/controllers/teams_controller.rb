class TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
    @videos = Video.with_team(@team)
  end
end
