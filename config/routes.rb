Rails.application.routes.draw do
  root 'pages#home'

  # Page routes
  get '/faq', to: 'pages#faq'

  get '/login', to: 'session#login', as: 'login'
  get '/auth/:provider/callback', to: 'session#create'
  get '/logout', to: 'session#logout', as: 'logout'

  namespace :videos do
    get :info
  end
  resources :videos
end
