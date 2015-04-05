class PagesController < ApplicationController
  def home
    @recent_videos = Video.order(created_at: 'desc').paginate(page: params[:page])
  end

  def faq; end

  def search; end
end
