class DebatersController < ApplicationController
  def show
    @debater = Debater.find(params[:id])
    video_ids = Video.with_debater(@debater)
    @videos = Video.where(id: video_ids)
  end
end
