class TagsController < ApplicationController
  def show
    @tag = Tag.find_by_title(params[:id])
  end

  def autocomplete
    render json: Tag.like(params[:q]).map { |tag| { id: tag.id, text: tag.title } }
  end
end
