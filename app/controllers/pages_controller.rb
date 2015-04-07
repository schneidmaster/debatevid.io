class PagesController < ApplicationController
  def home
    @recent_videos = Video.paginate(page: params[:page])
    @live_videos = Video.live
  end

  def faq; end

  def search; end
end
