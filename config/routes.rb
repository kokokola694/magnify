Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create]

    resources :genres, only: [:index, :show]
    resources :follows, only: [:create, :destroy]
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:index, :show]
    resources :albums, only: [:index, :show]
    resources :artists, only: [:index, :show]
    resources :playlists, only: [:index, :show, :create, :destroy]
    resources :playlist_songs, only: [:create, :destroy]
    resources :saves, only: [:create, :destroy]
  end

  root "static_pages#root"

end
