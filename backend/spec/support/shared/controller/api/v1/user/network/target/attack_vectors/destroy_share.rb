require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::AttackVectorsController#destroy shared spec' do
  describe 'DELETE #destroy' do
    before do
      # Destroy an user with a target.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)
      @attack_vector = FactoryBot.create(:attack_vector, user_network_target_id: @target.id)
    end

    describe 'as the user who created the targets' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        delete :destroy,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id,
              id: @attack_vector.id
            }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been deleted the AttackVector' do
        expect(User::Network::Target::AttackVector.where(id: @attack_vector.id).count).to eq(0)
      end
    end

    describe 'as another user' do
      before do
        @another_user = FactoryBot.create(:user)
        request.headers.merge!(@another_user.create_new_auth_token)

        delete :destroy,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id,
              id: @attack_vector.id
            }
      end
      it 'should be forbidden' do
        expect(response.status).to eq 403
      end
      it 'should not have been created the AttackVector' do
        expect(User::Network::Target::AttackVector.where(id: @attack_vector.id).count).to eq(1)
      end
    end

    describe 'as no user' do
      before do
        delete :destroy,
            params: {
              user_id: @user.id,
              network_id: @network.id,
              target_id: @target.id,
              id: @attack_vector.id
            }
      end
      it 'should be not authorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been created the AttackVector' do
        expect(User::Network::Target::AttackVector.where(id: @attack_vector.id).count).to eq(1)
      end
    end

  end
end
