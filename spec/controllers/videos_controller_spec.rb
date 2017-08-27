describe VideosController do
  let(:user) { create(:user) }
  let(:tournament) { create(:tournament) }
  let(:school_one) { create(:school) }
  let(:school_two) { create(:school) }
  let(:tag) { create(:tag) }
  let(:debater_one) { create(:debater, last_name: 'Doe') }
  let(:debater_two) { create(:debater, last_name: 'Smith') }
  let(:debater_three) { create(:debater, last_name: 'Baker') }
  let(:debater_four) { create(:debater, last_name: 'Thomas') }
  let!(:team) { create(:team, school: school_one, debater_one: debater_one, debater_two: debater_two) }

  let(:base_video_params) do
    {
      segments: [
        {
          provider: "youtube",
          key: "abc",
          thumbnail: "https://google.com",
        },
        {
          provider: "youtube",
          key: "def",
          thumbnail: "https://google.com/1",
        },
      ],
      debate_type: 'parli',
      debate_level: 'college',
      aff_team_attributes: {
        school_id: school_one.id,
        debater_one_id: debater_one.id,
        debater_two_id: debater_two.id,
      },
      neg_team_attributes: {
        school_id: school_two.id,
        debater_one_id: debater_three.id,
        debater_two_id: debater_four.id,
      },
      tournament_id: tournament.id,
      tags_videos_attributes: [
        {
          tag_id: tag.id,
        },
      ],
    }
  end

  let(:new_video_params) do
    {
      segments: [
        {
          provider: "youtube",
          key: "abc",
          thumbnail: "https://google.com",
        },
        {
          provider: "youtube",
          key: "def",
          thumbnail: "https://google.com/1",
        },
      ],
      debate_type: 'parli',
      debate_level: 'college',
      aff_team_attributes: {
        school_attributes: {
          name: 'Southern Illinois',
        },
        debater_one_attributes: {
          name: 'John Doe',
        },
        debater_two_attributes: {
          name: 'Jane Smith',
        },
      },
      neg_team_attributes: {
        school_attributes: {
          name: 'Washburn',
        },
        debater_one_attributes: {
          name: 'John Baker',
        },
        debater_two_attributes: {
          name: 'Jane Thomas',
        },
      },
      tournament_attributes: {
        name: 'NPTE',
        year: 2015,
      },
      tags_videos_attributes: [
        {
          tag_attributes: {
            title: 'policy',
          },
        },
      ],
    }
  end

  before { login_as_user(user) }

  describe '#new' do
    subject(:request) { get :new }

    it 'renders new' do
      expect(request).to render_template('videos/new')
    end
  end

  describe '#show' do
    let(:video) { create(:video) }

    subject(:request) { get :show, params: { id: video.id } }

    it 'renders show' do
      expect(request).to render_template('videos/show')
    end

    it 'increments views count' do
      expect { request }.to change { video.reload.views }.by(1)
    end
  end

  describe '#info' do
    let(:link) { 'https://youtube.com?key=abc' }

    subject(:request) { get :info, params: { link: link } }

    context 'valid link' do
      before { allow(VideoInformationService).to receive(:link_info).with(link).and_return(key: 'abc', provider: 'youtube') }

      context 'video does not exist yet' do
        it 'returns info' do
          expect(request.body).to include_json(key: 'abc', provider: 'youtube')
        end
      end

      context 'video already exists' do
        let!(:video) { create(:video, key: %w[abc], provider: 'youtube') }

        it 'returns exists' do
          expect(request.body).to include_json(exists: true)
        end
      end
    end

    context 'invalid link' do
      before { allow(VideoInformationService).to receive(:link_info).with(link).and_return(invalid: true) }

      it 'returns invalid' do
        expect(request.body).to include_json(invalid: true)
      end
    end
  end

  describe '#create' do
    subject(:request) { post :create, format: :json, params: { video: video_params } }

    context 'video is invalid' do
      let(:video_params) { { provider: 'youtube' } }

      it 'returns error code' do
        expect(request).to have_http_status(:unprocessable_entity)
      end

      it 'renders errors' do
        expect(request.body).to include_json(aff_team: ["can't be blank"])
      end
    end

    context 'basic create' do
      let(:video_params) { base_video_params }

      it 'creates video' do
        expect { request }.to change { Video.count }.by(1)
      end

      it 'creates new team and uses existing one' do
        expect { request }.to change { Team.count }.by(1)
      end

      it 'creates video with correct attributes' do
        expect(request).to have_http_status(:ok)

        video = Video.find(JSON.parse(request.body)['id'])
        expect(video.tournament).to eq(tournament)
        expect(video.aff_team.school).to eq(school_one)
        expect(video.aff_team.debater_one).to eq(debater_one)
        expect(video.aff_team.debater_two).to eq(debater_two)
        expect(video.neg_team.school).to eq(school_two)
        expect(video.neg_team.debater_one).to eq(debater_three)
        expect(video.neg_team.debater_two).to eq(debater_four)
        expect(video.provider).to eq('youtube')
        expect(video.key).to eq(%w[abc def])
        expect(video.thumbnail).to eq('https://google.com')
      end
    end

    context 'creating new records' do
      let(:video_params) { new_video_params }

      it 'creates video' do
        expect { request }.to change { Video.count }.by(1)
      end

      it 'creates new schools' do
        expect { request }.to change { School.count }.by(2)
      end

      it 'creates new debaters' do
        expect { request }.to change { Debater.count }.by(4)
      end

      it 'creates video with correct attributes' do
        expect(request).to have_http_status(:ok)

        video = Video.find(JSON.parse(request.body)['id'])
        expect(video.tournament.name).to eq('NPTE')
        expect(video.tournament.year).to eq(2015)
        expect(video.aff_team.school.name).to eq('Southern Illinois')
        expect(video.aff_team.debater_one.name).to eq('John Doe')
        expect(video.aff_team.debater_two.name).to eq('Jane Smith')
        expect(video.neg_team.school.name).to eq('Washburn')
        expect(video.neg_team.debater_one.name).to eq('John Baker')
        expect(video.neg_team.debater_two.name).to eq('Jane Thomas')
        expect(video.provider).to eq('youtube')
        expect(video.key).to eq(%w[abc def])
        expect(video.thumbnail).to eq('https://google.com')
      end
    end
  end
end
