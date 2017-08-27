describe FavoritesController do
  let(:user) { create(:user) }
  let(:video) { create(:video) }

  before { login_as_user(user) }

  describe '#create' do
    subject(:request) { post :create, format: :json, params: { video_id: video.id } }

    context 'when favorite does not exist yet' do
      it 'returns success' do
        expect(request).to have_http_status(:ok)
      end

      it 'creates favorite' do
        expect { request }.to change { Favorite.where(video: video, user: user).exists? }.from(false).to(true)
      end
    end

    context 'when favorite already exists' do
      before { create(:favorite, user: user, video: video) }

      it 'returns success' do
        expect(request).to have_http_status(:ok)
      end

      it 'keeps favorite' do
        expect { request }.to_not change { Favorite.where(video: video, user: user).count }.from(1)
      end
    end
  end

  describe '#delete' do
    subject(:request) { delete :destroy, format: :json, params: { video_id: video.id } }

    context 'when favorite does not exist' do
      it 'returns success' do
        expect(request).to have_http_status(:no_content)
      end

      it 'keeps lack of favorite' do
        expect { request }.to_not change { Favorite.where(video: video, user: user).count }.from(0)
      end
    end

    context 'when favorite already exists' do
      before { create(:favorite, user: user, video: video) }

      it 'returns success' do
        expect(request).to have_http_status(:no_content)
      end

      it 'deletes favorite' do
        expect { request }.to change { Favorite.where(video: video, user: user).exists? }.from(true).to(false)
      end

      it 'removes favorite from video' do
        expect { request }.to change { video.favorites.count }.by(-1)
      end

      it 'removes favorite from user' do
        expect { request }.to change { user.favorites.count }.by(-1)
      end
    end
  end
end
