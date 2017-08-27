class SchoolsController < ApplicationController
  def show
    @school = School.find(params[:id])
    @videos = Video.with_school(@school)
  end
end
