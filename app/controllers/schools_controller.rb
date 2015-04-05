class SchoolsController < ApplicationController
  def show
    @school = School.find(params[:id])
    @videos = Video.with_school(@school).paginate(page: params[:page])
  end

  def autocomplete
    render json: School.like(params[:q]).map { |school| { id: school.id, text: school.name } }
  end
end
