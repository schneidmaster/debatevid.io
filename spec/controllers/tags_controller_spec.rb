describe TagsController do
  let(:tag) { create(:tag) }
  let(:video) { create(:video, tags: [tag]) }
  let(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: tag.title } }

    it 'renders template with videos' do
      request
      expect(assigns(:tag)).to eq(tag)
      expect(assigns(:videos)).to eq([video])
    end
  end
end
