Rails.application.routes.draw do
  root 'main#index'

  as :user do
    namespace :api do
      mount_devise_token_auth_for 'User', at: 'auth'
      namespace :v1 do
          resources :users do
            resource :api_key, only: [:create, :show], module: :user

            resources :networks, only: [:index, :show, :create, :update, :destroy], module: :user do
              resources :targets, only: [:index, :show, :create, :update, :destroy], module: :network do
                resources :blocks, module: :target, only: [:index, :create, :update, :destroy] do
                  resources :checklist_elements, module: :block, only: [:update]
                end
                resources :services, module: :target, only: [:index, :create, :destroy]
                namespace 'services', module: :target do
                  post 'create_with_nmap' => 'services#create_with_nmap', as: :services_create_with_nmap
                end
                resources :attack_vectors, module: :target, only: [:index, :create, :destroy, :update]
                resources :ideas, module: :target, only: [:index, :create, :destroy, :update]
                get 'timeline' => 'targets#timeline', :as => :target_timeline
                resources :time_entries, module: :target, only: [:index, :create]
              end
            end
          end
      end
    end
  end

end
