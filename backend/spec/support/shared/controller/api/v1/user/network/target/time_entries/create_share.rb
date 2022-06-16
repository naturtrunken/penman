require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::TimeEntriesController#create shared spec' do
  describe 'POST #create' do
    before do
      # Create an user, a network, a target.
      @user = FactoryBot.create(:user)
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)
      @old_time_entries_count = @target.time_entries.count
    end

    describe 'as user' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        post :create,
             params: {
               user_id: @user.id,
               network_id: @network.id,
               target_id: @target.id,
               time_entry: {
                 status: 1
               }
             }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been created the new time entry' do
        expect(@target.time_entries.count).to eq(@old_time_entries_count + 1)
      end
    end

    describe 'as no user' do
      before do
        post :create,
             params: {
               user_id: FactoryBot.create(:user).id,
               network_id: @network.id,
               target_id: @target.id,
               time_entry: {
                 status: 1
               }
             }
      end
      it 'should be unauthorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been created the new time entry' do
        expect(@target.time_entries.count).to eq(@old_time_entries_count)
      end
    end

  end
end
