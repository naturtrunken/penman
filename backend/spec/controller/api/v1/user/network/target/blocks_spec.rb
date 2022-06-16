require 'rails_helper'

describe Api::V1::User::Network::Target::BlocksController, :type => :controller do
  include_context 'Api::V1::User::Network::Target::BlocksController#index shared spec'
  include_context 'Api::V1::User::Network::Target::BlocksController#create shared spec'
  include_context 'Api::V1::User::Network::Target::BlocksController#destroy shared spec'
end
