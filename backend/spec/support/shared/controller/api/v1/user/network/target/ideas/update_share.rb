require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::IdeasController#update shared spec' do
  describe 'GET #update' do
    before do
      # Create an user with a target.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)
      @idea = FactoryBot.create(:idea, user_network_target_id: @target.id)
    end

    describe 'as the user who created the targets' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        get :update,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id,
              id: @idea.id,
              idea: {
                tried: true
              }
            }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been updated the idea' do
        expect(User::Network::Target::Idea.where(id: @idea.id).first.reload.tried).to be(true)
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        get :update,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id,
              id: @idea.id,
              idea: {
                tried: true
              }
            }
      end
      it 'should be forbidden' do
        expect(response.status).to eq 403
      end
      it 'should not have been updated the idea' do
        expect(User::Network::Target::Idea.where(id: @idea.id).first.reload.tried).to be(false)
      end
    end

    describe 'as no user' do
      before do
        get :update,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id,
              id: @idea.id,
              idea: {
                tried: true
              }
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been updated the idea' do
        expect(User::Network::Target::Idea.where(id: @idea.id).first.reload.tried).to be(false)
      end
    end

  end
end
