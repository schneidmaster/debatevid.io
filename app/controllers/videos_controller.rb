class VideosController < ApplicationController
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

  def info
    render json: VideoInformationService.link_info(params[:link])
  end

  private

  def authorize
    redirect_to [:login] unless logged_in?
  end
end
