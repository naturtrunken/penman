require 'rails_helper'

shared_context 'Api::V1::User::ApiKeysController#create shared spec' do
  describe 'POST #create' do
    before do
      @user = FactoryBot.create(:user)
      @old_api_key = @user.build_api_key
      @old_api_key.save!
    end

    describe 'as user' do
      before do
        request.headers.merge!(@user.create_new_auth_token)
        post :create,
             params: {
               user_id: @user.id
             }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been assigned the new key' do
        expect(@user.reload.api_key.value).not_to eq(@old_api_key.value)
      end
    end

    describe 'as no user' do
      before do
        post :create,
             params: {
               user_id: FactoryBot.create(:user).id
             }
      end
      it 'should be unauthorized' do
        expect(response.status).to eq 401
      end
      it 'should not have been assigned the new key' do
        expect(@user.reload.api_key.value).to eq(@old_api_key.value)
      end
    end

  end
end
