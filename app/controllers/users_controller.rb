class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @videos = @user.videos
  end
end
