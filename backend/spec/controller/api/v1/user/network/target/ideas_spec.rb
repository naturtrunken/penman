require 'rails_helper'

describe Api::V1::User::Network::Target::IdeasController, :type => :controller do
  include_context 'Api::V1::User::Network::Target::IdeasController#index shared spec'
  include_context 'Api::V1::User::Network::Target::IdeasController#create shared spec'
  include_context 'Api::V1::User::Network::Target::IdeasController#destroy shared spec'
  include_context 'Api::V1::User::Network::Target::IdeasController#update shared spec'
end
