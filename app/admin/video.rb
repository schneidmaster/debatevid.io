ActiveAdmin.register Video do
  controller do
    def permitted_params
      params.permit! # allow all parameters
    end
  end
end
