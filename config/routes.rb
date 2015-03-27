Rails.application.routes.draw do
  root 'pages#home'
  
  # Page routes
  get '/about', to: 'pages#about'
  
  get '/login', to: 'session#login', as: 'login'
  get '/auth/:provider/callback', to: 'session#create'
  get '/logout', to: 'session#logout', as: 'logout'
  
  resources :videos
end
