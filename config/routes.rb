Rails.application.routes.draw do
  get '/auth/:provider/callback', to: 'session#create'
  get '/auth/failure', to: 'session#failure'
  get '/logout', to: 'session#logout', as: 'logout'

  get '/sitemap.xml.gz', to: 'sitemap#index'

  # Error pages.
  %w[404 422 500].each do |code|
    match code, to: "errors#error_#{code}", via: :all
  end

  resources :debaters, only: [:show]
  resources :schools, only: [:show]
  resources :teams, only: [:show]
  resources :tags, only: [:show]
  resources :tournaments, only: [:show]
  resources :users, only: [:show]
  resources :favorites, only: [:index]

  namespace :videos do
    get :info
  end
  resources :videos, only: %i[show new create] do
    post :add_tags, as: 'add_tags'

    resources :favorites, only: [:create] do
      collection do
        delete :destroy
      end
    end
  end
end
