class SchoolsController < ApplicationController
  before_filter :authorize, except: [:show]

  def index
  end

  def new
    @video = Video.new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def autocomplete
    render json: School.like(params[:q]).map { |school| {id: school.id, text: school.name} }
  end

  private

  def authorize
    redirect_to [:login] unless logged_in?
  end
end
