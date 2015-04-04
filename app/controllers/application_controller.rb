class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # For the time being, basicauth
  http_basic_authenticate_with name: 'dev', password: 'dev'

  def logged_in?
    session[:current_user].present?
  end

  def current_user
    return nil unless logged_in?
    User.find session[:current_user]
  end

  def authenticate_admin_user!
    redirect_to root_path unless logged_in? && current_user.is_admin
  end
end
