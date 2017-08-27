describe Video do
  describe '#title' do
    let(:aff_school) { create(:school, name: 'Southern Illinois University', short_name: 'SIU') }
    let(:neg_school) { create(:school, name: 'Washburn University', short_name: 'Washburn') }
    let(:aff_debater_one) { create(:debater, name: 'John Doe') }
    let(:aff_debater_two) { create(:debater, name: 'Jane Smith') }
    let(:neg_debater_one) { create(:debater, name: 'John Baker') }
    let(:neg_debater_two) { create(:debater, name: 'Jane Thomas') }
    let(:aff_team) { create(:team, school: aff_school, debater_one: aff_debater_one, debater_two: aff_debater_two) }
    let(:neg_team) { create(:team, school: neg_school, debater_one: neg_debater_one, debater_two: neg_debater_two) }
    let(:tournament) { create(:tournament, year: 2015, name: 'NPTE') }
    let(:video) { create(:video, tournament: tournament, aff_team: aff_team, neg_team: neg_team) }

    it 'returns title' do
      expect(video.title).to eq('2015 NPTE: SIU DS vs. Washburn BT')
    end
  end
end
