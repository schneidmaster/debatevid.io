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
  resources :debaters, only: [:show]

  namespace :schools do
    get :autocomplete
  end
  resources :schools, only: [:show]

  resources :teams, only: [:show]

  namespace :videos do
    get :info
  end
  resources :videos, only: [:show, :new, :create]

  namespace :tags do
    get :autocomplete
  end
  resources :tags, only: [:show]

  namespace :tournaments do
    get :autocomplete
  end
  resources :tournaments, only: [:show]
end
