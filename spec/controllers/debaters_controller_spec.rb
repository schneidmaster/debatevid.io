describe DebatersController do
  let(:debater) { create(:debater) }
  let(:video) { create(:video, aff_team: create(:team, debater_one: debater)) }
  let(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: debater.id } }

    it 'renders template with videos' do
      request
      expect(assigns(:debater)).to eq(debater)
      expect(assigns(:videos)).to eq([video])
    end
  end
end
