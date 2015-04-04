class SessionController < ApplicationController
  def login; end

  def create
    @user = User.find_or_create_from_auth_hash auth_hash
    session[:current_user] = @user.id
    redirect_to root_path, notice: 'Logged in!'
  end

  def failure
    redirect_to root_path, alert: 'Login failed. Please try again.'
  end

  def logout
    session[:current_user] = nil
    redirect_to root_path, notice: 'Logged out!'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
