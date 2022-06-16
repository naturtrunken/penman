require 'rails_helper'

describe Api::V1::User::Network::Target::ServicesController, :type => :controller do
  include_context 'Api::V1::User::Network::Target::ServicesController#index shared spec'
  include_context 'Api::V1::User::Network::Target::ServicesController#destroy shared spec'
  include_context 'Api::V1::User::Network::Target::ServicesController#create shared spec'
  include_context 'Api::V1::User::Network::Target::ServicesController#create_with_nmap shared spec'
end
