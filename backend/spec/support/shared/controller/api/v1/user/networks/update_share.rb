require 'rails_helper'

shared_context 'Api::V1::User::NetworksController#update shared spec' do
  describe 'GET #update' do
    before do
      # Create an user with a network.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @new_name = FactoryBot.attributes_for(:network)[:name]
    end

    describe 'as the user who created the networks' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        get :update,
            params: {
              user_id: @user.id,
              id: @network.id,
              network: {
                name: @new_name
              }
            }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been updated the network' do
        expect(User::Network.where(id: @network.id).first.reload.name).to eq(@new_name)
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        get :update,
            params: {
              user_id: @user.id,
              id: @network.id,
              network: {
                name: @new_name
              }
            }
      end
      it 'should be forbidden' do
        expect(response.status).to eq 403
      end
      it 'should not have been updated the network' do
        expect(User::Network.where(id: @network.id).first.reload.name).to eq(@network.name)
      end
    end

    describe 'as no user' do
      before do
        get :update,
            params: {
              user_id: @user.id,
              id: @network.id,
              network: {
                name: @new_name
              }
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been updated the network' do
        expect(User::Network.where(id: @network.id).first.reload.name).to eq(@network.name)
      end
    end

  end
end
