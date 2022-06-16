require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::BlocksController#create shared spec' do
  describe 'POST #create' do
    before do
      # Create an user, a network, a target.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)

      @new_text = FactoryBot.attributes_for(:block)[:text]
    end

    describe 'as user' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        post :create,
             params: {
               user_id: @user.id,
               network_id: @network.id,
               target_id: @target.id,
               block: {
                 text: @new_text
               }
             }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been created the new target' do
        expect(@target.blocks.reload.where(text: @new_text).count).to eq(1)
      end
    end

    describe 'as no user' do
      before do
        post :create,
             params: {
               user_id: FactoryBot.create(:user).id,
               network_id: @network.id,
               target_id: @target.id,
               block: {
                 text: @new_text
               }
             }
      end
      it 'should be unauthorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been created the new target' do
        expect(User::Network::Target::Block.where(text: @new_text).count).to eq(0)
      end
    end

  end
end
