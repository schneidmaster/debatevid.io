class DebatersController < ApplicationController
  def show
    @debater = Debater.find(params[:id])
    @videos = Video.with_debater(@debater)
  end
end
