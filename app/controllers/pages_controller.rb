class PagesController < ApplicationController
  def home
    @recent_videos = Video.order(created_at: 'desc').limit(12)
  end

  def faq; end

  def search; end
end
