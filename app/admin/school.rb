ActiveAdmin.register School do
  controller do
    def permitted_params
      params.permit! # allow all parameters
    end
  end
end
