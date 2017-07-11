module ApplicationHelper
  def recent_videos
    Video.paginate(page: params[:page])
  end

  def live_videos
    Video.live
  end

  def featured_videos
    Video.featured.limit(3)
  end
end
