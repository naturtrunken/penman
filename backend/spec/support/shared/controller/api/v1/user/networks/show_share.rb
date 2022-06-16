require 'rails_helper'

shared_context 'Api::V1::User::NetworksController#show shared spec' do
  describe 'GET #show' do
    before do
      # Create an user with a network.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
    end

    describe 'as the user who created the networks' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        get :show,
            params: {
              user_id: @user.id,
              id: @network.id
            }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should return four networks' do
        json = JSON.parse(response.body)
        expect(json['id']).to eq(@network.id)
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        get :show,
            params: {
              user_id: @user.id,
              id: @network.id
            }
      end
      it 'should be forbidden' do
        expect(response.status).to eq 403
      end
    end

    describe 'as no user' do
      before do
        get :show,
            params: {
              user_id: @user.id,
              id: @network.id
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
    end

  end
end
