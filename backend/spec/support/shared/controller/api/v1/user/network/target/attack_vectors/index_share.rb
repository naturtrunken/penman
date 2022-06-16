require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::AttackVectorsController#index shared spec' do
  describe 'GET #index' do
    before do
      # Create an user with a network, a target and three attack vectors.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)
      1.upto(3).each { FactoryBot.create(:attack_vector, user_network_target_id: @target.id) }
    end

    describe 'as the user who created the target' do
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
      it 'should return three attack vectors' do
        json = JSON.parse(response.body)
        expect(json['attack_vectors'].count).to eq(3)
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
