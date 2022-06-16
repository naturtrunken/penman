require 'rails_helper'

shared_context 'Api::V1::User::Network::TargetsController#index shared spec' do
  describe 'GET #index' do
    before do
      # Create an user with a network and three targets.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      1.upto(3).each { FactoryBot.create(:target, user_network_id: @network.id) }
    end

    describe 'as the user who created the targets' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        get :index,
            params: {
              user_id: @user.id,
              network_id: @network.id
            }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should return three targets' do
        json = JSON.parse(response.body)
        expect(json['targets'].count).to eq(3)
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        get :index,
            params: {
              user_id: @user.id,
              network_id: @network.id
            }
      end
      it 'should be forbidden' do
        expect(response.status).to eq 403
      end
    end

    describe 'as no user' do
      before do
        get :index,
            params: {
              user_id: @user.id,
              network_id: @network.id
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
    end

  end
end
