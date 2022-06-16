require 'rails_helper'

describe Api::V1::User::ApiKeysController, :type => :controller do
  include_context 'Api::V1::User::ApiKeysController#create shared spec'
  include_context 'Api::V1::User::ApiKeysController#show shared spec'
end
