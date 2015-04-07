ActiveAdmin.register Video do
  form do |f|
    input :user
    input :tournament
    input :aff_team
    input :neg_team
    input :debate_type, as: :select, collection: Video.debate_types.keys.to_a
    input :debate_level, as: :select, collection: Video.debate_levels.keys.to_a
    input :thumbnail
    input :live_now
    actions
  end

  controller do
    def permitted_params
      params.permit! # allow all parameters
    end
  end
end
