class SchoolsController < ApplicationController
  def show
    @school = School.find(params[:id])
    video_ids = Video.with_school(@school).pluck(:id)
    @videos = Video.where(id: video_ids)
  end
end
