require 'rails_helper'

describe Api::V1::User::Network::TargetsController, :type => :controller do
  include_context 'Api::V1::User::Network::TargetsController#index shared spec'
  include_context 'Api::V1::User::Network::TargetsController#show shared spec'
  include_context 'Api::V1::User::Network::TargetsController#create shared spec'
  include_context 'Api::V1::User::Network::TargetsController#update shared spec'
  include_context 'Api::V1::User::Network::TargetsController#destroy shared spec'
  include_context 'Api::V1::User::Network::TargetsController#timeline shared spec'
end
