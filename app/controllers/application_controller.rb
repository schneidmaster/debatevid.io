class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def logged_in?
    session[:current_user].present?
  end

  def current_user
    return nil unless logged_in?
    User.find session[:current_user]
  end
end
