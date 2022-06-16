require 'rails_helper'

describe Api::V1::User::NetworksController, :type => :controller do
  include_context 'Api::V1::User::NetworksController#index shared spec'
  include_context 'Api::V1::User::NetworksController#show shared spec'
  include_context 'Api::V1::User::NetworksController#create shared spec'
  include_context 'Api::V1::User::NetworksController#update shared spec'
  include_context 'Api::V1::User::NetworksController#destroy shared spec'
end
