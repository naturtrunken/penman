require 'rails_helper'

describe Api::V1::User::Network::Target::AttackVectorsController, :type => :controller do
  include_context 'Api::V1::User::Network::Target::AttackVectorsController#index shared spec'
  include_context 'Api::V1::User::Network::Target::AttackVectorsController#create shared spec'
  include_context 'Api::V1::User::Network::Target::AttackVectorsController#destroy shared spec'
  include_context 'Api::V1::User::Network::Target::AttackVectorsController#update shared spec'
end
