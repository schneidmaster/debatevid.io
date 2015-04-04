class TagsController < ApplicationController
  def autocomplete
    render json: Tag.like(params[:q]).map { |tag| {id: tag.id, text: tag.title} }
  end
end
