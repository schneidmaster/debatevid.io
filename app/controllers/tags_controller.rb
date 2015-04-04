class TagsController < ApplicationController
  def autocomplete
    render json: Tag.like(params[:q]).map { |debater| {id: debater.id, text: debater.name} }
  end
end
