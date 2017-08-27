describe SchoolsController do
  let(:school) { create(:school) }
  let(:video) { create(:video, aff_team: create(:team, school: school)) }
  let(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: school.id } }

    it 'renders template with videos' do
      request
      expect(assigns(:school)).to eq(school)
      expect(assigns(:videos)).to eq([video])
    end
  end
end
