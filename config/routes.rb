Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  root 'pages#home'

  # Page routes
  get '/faq', to: 'pages#faq'
  get '/search', to: 'pages#search'

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

  namespace :teams do
    get :autocomplete
  end
  resources :teams, only: [:show]

  namespace :videos do
    get :info
    get :search
  end
  resources :videos, only: [:show, :new, :create] do
    post :add_tags, as: 'add_tags'
  end

  namespace :tags do
    get :autocomplete
  end
  resources :tags, only: [:show]

  namespace :tournaments do
    get :autocomplete
  end
  resources :tournaments, only: [:show]
end
