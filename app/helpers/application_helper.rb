module ApplicationHelper
  def logged_in?
    session[:current_user].present?
  end

  def current_user
    return nil unless logged_in?
    User.find session[:current_user]
  end

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
