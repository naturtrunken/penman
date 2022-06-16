require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::ServicesController#create shared spec' do
  describe 'POST #create' do
    before do
      # Create an user, a network, a target.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)

      @new_name = FactoryBot.attributes_for(:service)[:name]
    end

    describe 'as user' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        post :create,
             params: {
               user_id: @user.id,
               network_id: @network.id,
               target_id: @target.id,
               service: {
                 name: @new_name,
                 port: 8080,
                 protocol: "tcp"
               }
             }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been created the new target' do
        expect(@target.services.reload.where(name: @new_name).count).to eq(1)
      end
    end

    describe 'as no user' do
      before do
        post :create,
             params: {
               user_id: FactoryBot.create(:user).id,
               network_id: @network.id,
               target_id: @target.id,
               service: {
                 name: @new_name,
                 port: 8080,
                 protocol: "tcp"
               }
             }
      end
      it 'should be unauthorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been created the new target' do
        expect(User::Network::Target::Service.where(name: @new_name).count).to eq(0)
      end
    end

  end
end
