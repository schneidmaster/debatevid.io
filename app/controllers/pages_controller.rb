class PagesController < ApplicationController
  def home
    @recent_videos = Video.paginate(page: params[:page])
  end

  def faq; end

  def search; end
end
