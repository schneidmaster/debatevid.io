describe VideosController do
  let(:user) { create(:user) }
  let(:tournament) { create(:tournament) }
  let(:school_one) { create(:school) }
  let(:school_two) { create(:school) }
  let(:tag) { create(:tag) }
  let(:debater_one) { create(:debater) }
  let(:debater_two) { create(:debater) }
  let(:debater_three) { create(:debater) }
  let(:debater_four) { create(:debater) }
  let!(:team) { create(:team, school: school_one, debater_one: debater_one, debater_two: debater_two) }

  let(:video_params) do
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

  before { login_as_user(user) }

  describe '#create' do
    subject(:request) { post :create, format: :json, params: { video: video_params } }

    context 'basic create' do
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
        expect(video.thumbnail).to eq('https://img.youtube.com/vi/abc/hqdefault.jpg')
      end
    end
  end
end
