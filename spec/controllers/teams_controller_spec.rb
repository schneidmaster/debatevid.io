describe TeamsController do
  let(:team) { create(:team) }
  let(:video) { create(:video, aff_team: team) }
  let(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: team.id } }

    it 'renders template with videos' do
      request
      expect(assigns(:team)).to eq(team)
      expect(assigns(:videos)).to eq([video])
    end
  end
end
