require 'rails_helper'

shared_context 'Api::V1::User::NetworksController#destroy shared spec' do
  describe 'DELETE #destroy' do
    before do
      # Destroy an user with a network.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @new_name = FactoryBot.attributes_for(:network)[:name]
    end

    describe 'as the user who created the networks' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        delete :destroy,
            params: {
              user_id: @user.id,
              id: @network.id
            }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been deleted the network' do
        expect(User::Network.where(id: @network.id).count).to eq(0)
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        delete :destroy,
            params: {
              user_id: @user.id,
              id: @network.id
            }
      end
      it 'should be forbidden' do
        expect(response.status).to eq 403
      end
      it 'should not have been created the network' do
        expect(User::Network.where(id: @network.id).count).to eq(1)
      end
    end

    describe 'as no user' do
      before do
        delete :destroy,
            params: {
              user_id: @user.id,
              id: @network.id
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been created the network' do
        expect(User::Network.where(id: @network.id).count).to eq(1)
      end
    end

  end
end
