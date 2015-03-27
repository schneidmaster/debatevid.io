module SessionHelper
  def logged_in?
    session[:current_user].present?
  end
  
  def current_user
    return nil unless logged_in?
    User.find session[:current_user]
  end
end
