class PagesController < ApplicationController
  def home
    @recent_videos = Video.paginate(page: params[:page])
    @live_videos = Video.live
    @featured_videos = Video.featured.limit(4)
  end

  def faq; end

  def search; end
end
