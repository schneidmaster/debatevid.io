class TagsController < ApplicationController
  def show
    @tag = Tag.find_by(title: params[:id])
    @videos = @tag.videos
  end
end
