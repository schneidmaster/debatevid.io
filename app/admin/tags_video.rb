ActiveAdmin.register TagsVideo do
  index do
    selectable_column
    column :user
    column :tag
    column :video
  end

  controller do
    def permitted_params
      params.permit! # allow all parameters
    end
  end
end
