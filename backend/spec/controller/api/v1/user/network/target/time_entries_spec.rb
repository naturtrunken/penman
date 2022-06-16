require 'rails_helper'

describe Api::V1::User::Network::Target::TimeEntriesController, :type => :controller do
  include_context 'Api::V1::User::Network::Target::TimeEntriesController#index shared spec'
  include_context 'Api::V1::User::Network::Target::TimeEntriesController#create shared spec'
end
