describe TournamentsController do
  let(:tournament) { create(:tournament) }
  let(:video) { create(:video, tournament: tournament) }
  let(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: tournament.id } }

    it 'renders template with videos' do
      request
      expect(assigns(:tournament)).to eq(tournament)
      expect(assigns(:videos)).to eq([video])
    end
  end
end
