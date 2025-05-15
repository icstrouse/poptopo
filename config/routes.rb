Rails.application.routes.draw do
  root "map#index"

  scope :map do
    get "/", to: "map#index"
    get "/tags/:id", to: "map#tag", as: "map_tags_path"
    get "/tracks/:id", to: "map#track", as: "map_tracks_path"
  end

  resources :tags
  resources :tracks
  resource :session
  resources :passwords, param: :token

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
