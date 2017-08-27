describe UsersController do
  let(:user) { create(:user) }
  let(:video) { create(:video, user: user) }
  let(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: user.id } }

    it 'renders template with videos' do
      request
      expect(assigns(:user)).to eq(user)
      expect(assigns(:videos)).to eq([video])
    end
  end
end
