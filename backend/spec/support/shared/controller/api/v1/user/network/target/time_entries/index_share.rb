require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::TimeEntriesController#index shared spec' do
  describe 'GET #index' do
    before do
      # Create an user with a network, a target and three blocks.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)

      # Create some time entries for this target.
      # 10 Min + 3 Min => 13 Min
      fixed_time = Time.now
      te1 = FactoryBot.create(:time_entry, state: 'start', user_network_target_id: @target.id)
      te1.created_at = fixed_time
      te1.save!
      te2 = FactoryBot.create(:time_entry, state: 'stop', user_network_target_id: @target.id)
      te2.created_at = fixed_time + 10.minutes
      te2.save!
      te3 = FactoryBot.create(:time_entry, state: 'start', user_network_target_id: @target.id)
      te3.created_at = fixed_time + 15.minutes
      te3.save!
      te4 = FactoryBot.create(:time_entry, state: 'stop', user_network_target_id: @target.id)
      te4.created_at = fixed_time + 18.minutes
      te4.save!
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
      it 'should return the correct time' do
        json = JSON.parse(response.body)
        expect(json['total_time']).to eq("0000-01-01 00:13:00 +0100")
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
