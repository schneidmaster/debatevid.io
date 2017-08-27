describe TagsController do
  let!(:tag) { create(:tag) }
  let!(:video) { create(:video, tags: [tag]) }
  let!(:other_video) { create(:video) }

  describe '#show' do
    subject(:request) { get :show, params: { id: tag.title } }

    it 'renders template with videos' do
      request
      expect(assigns(:tag)).to eq(tag)
      expect(assigns(:videos)).to eq([video])
    end
  end

  describe '#create' do
    let(:user) { create(:user) }
    let(:video) { create(:video) }

    before { login_as_user(user) }

    subject(:request) { post :create, params: { video_id: video.id, tag: { title: title } } }

    context 'new tag' do
      let(:title) { 'abc' }

      it 'creates tag' do
        expect { request }.to change { Tag.count }.by(1)
      end

      it 'adds tag to video' do
        expect { request }.to change { video.reload.tags.where(title: 'abc').exists? }.from(false).to(true)
      end
    end

    context 'existing tag' do
      let!(:tag) { create(:tag, title: 'abc') }
      let(:title) { 'abc' }

      it 'does not create tag' do
        expect { request }.to_not(change { Tag.count })
      end

      it 'adds tag to video' do
        expect { request }.to change { video.reload.tags.where(title: 'abc').exists? }.from(false).to(true)
      end
    end

    context 'existing tag on video' do
      let!(:tag) { create(:tag, title: 'abc') }
      let!(:tag_video) { create(:tags_video, tag: tag, video: video) }
      let(:title) { 'abc' }

      it 'does not create tag' do
        expect { request }.to_not(change { Tag.count })
      end

      it 'does not duplicate-add tag to video' do
        expect { request }.to_not(change { video.reload.tags.count })
      end
    end
  end
end
