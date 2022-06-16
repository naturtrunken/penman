require 'rails_helper'

shared_context 'Api::V1::User::Network::Target::ServicesController#create_with_nmap shared spec' do
  describe 'POST #create_with_nmap' do
    before do
      # Create an user, a network, a target, and an API key.
      @user = FactoryBot.create(:user)
      @api_key = @user.build_api_key
      @api_key.save!
      @network = FactoryBot.create(:network, user_id: @user.id)
      @target = FactoryBot.create(:target, user_network_id: @network.id)

      @nmap_file = fixture_file_upload('nmap-short-tcp.xml', 'text/xml')
    end

    describe 'as user' do
      before do
        post :create_with_nmap,
             params: {
               user_id: @user.id,
               network_id: @network.id,
               target_id: @target.id,
               nmap_xml: @nmap_file,
               api_key: @api_key.value
             }
      end
      it 'should be ok' do
        expect(response.status).to eq 200
      end
      it 'should have been added the services from the nmap file' do
        expect(@target.services.reload.count).to eq(6)
      end
    end

    describe 'as no user' do
      before do
        post :create_with_nmap,
             params: {
               user_id: FactoryBot.create(:user).id,
               network_id: @network.id,
               target_id: @target.id,
               nmap_xml: @nmap_file,
               api_key: @api_key.value
             }
      end
      it 'should be not found (because the other user is not associated with the foreign network)' do
        expect(response.status).to eq 404
      end
      it 'should not have been added the services from the nmap file' do
        expect(@target.services.reload.count).to eq(0)
      end
    end

  end
end
