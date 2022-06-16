require 'rails_helper'

shared_context 'Api::V1::User::NetworksController#create shared spec' do
  describe 'POST #create' do
    before do
      @new_name = FactoryBot.attributes_for(:network)[:name]
    end

    describe 'as user' do
      before do
        @user = FactoryBot.create(:user)
        request.headers.merge!(@user.create_new_auth_token)
        post :create,
             params: {
               network: {
                 name: @new_name
               },
               user_id: @user.id,
             }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been created the new network' do
        expect(@user.networks.reload.where(name: @new_name).count).to eq(1)
      end
    end

    describe 'as no user' do
      before do
        post :create,
             params: {
               user_id: FactoryBot.create(:user).id,
               network: {
                 name: @new_name
               }
             }
      end
      it 'should be unauthorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been created the new network' do
        expect(User::Network.where(name: @new_name).count).to eq(0)
      end
    end

  end
end
