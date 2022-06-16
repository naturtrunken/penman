require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::BlocksController#index shared spec' do
  describe 'GET #index' do
    before do
      # Create an user with a network, a target and three blocks.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)
      1.upto(2).each { FactoryBot.create(:block, user_network_target_id: @target.id) }
      FactoryBot.create(:block, user_network_target_id: @target.id, phase: "enumeration")
    end

    describe 'as the user who created the blocks' do
      describe 'without filtering' do
        before do
          request.headers.merge!(@user.create_new_auth_token)
          get :index,
              params: {
                user_id: @user.id,
                network_id: @network.id,
                target_id: @target.id
              }
        end
        it 'should be ok' do
          expect(response.status).to eq 200
        end
        it 'should return three blocks' do
          json = JSON.parse(response.body)
          expect(json['blocks'].count).to eq(3)
        end
      end
      describe 'with filtering by phase' do
        before do
          request.headers.merge!(@user.create_new_auth_token)
          get :index,
              params: {
                user_id: @user.id,
                network_id: @network.id,
                target_id: @target.id,
                phase: "enumeration"
              }
        end
        it 'should be ok' do
          expect(response.status).to eq 200
        end
        it 'should return only one block' do
          json = JSON.parse(response.body)
          expect(json['blocks'].count).to eq(1)
        end
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        get :index,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id
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
              network_id: @network.id,
              target_id: @target.id
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
    end

  end
end
