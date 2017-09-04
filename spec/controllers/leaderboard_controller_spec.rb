describe LeaderboardController do
  describe '#index' do
    subject(:request) { get :index }

    it 'renders template with videos' do
      expect(request).to render_template(:index)
    end
  end
end
