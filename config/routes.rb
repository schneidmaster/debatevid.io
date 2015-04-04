Rails.application.routes.draw do
  root 'pages#home'

  # Page routes
  get '/faq', to: 'pages#faq'

  get '/login', to: 'session#login', as: 'login'
  get '/auth/:provider/callback', to: 'session#create'
  get '/auth/failure', to: 'session#failure'
  get '/logout', to: 'session#logout', as: 'logout'

  namespace :debaters do
    get :autocomplete
  end
  resources :debaters

  namespace :schools do
    get :autocomplete
  end
  resources :schools

  namespace :videos do
    get :info
  end
  resources :videos

  namespace :tags do
    get :autocomplete
  end
end
