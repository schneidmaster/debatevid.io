class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :redirect_if_heroku

  def authenticate_admin_user!
    redirect_to root_path unless logged_in? && current_user.is_admin
  end

  protected

  def logged_in?
    session[:current_user].present?
  end
  helper_method :logged_in?

  def current_user
    return nil unless logged_in?
    User.find session[:current_user]
  end
  helper_method :current_user

  private

  def redirect_if_heroku
    redirect_to "https://debatevid.io#{request.fullpath}" if request.host == 'debatevidio.herokuapp.com'
  end

  def authorize
    redirect_to root_path, error: 'You must log in first.' unless logged_in?
  end
end
