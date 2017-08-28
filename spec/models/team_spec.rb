describe Team do
  let(:school) { create(:school, short_name: 'SIU') }
  let(:debater_one) { create(:debater, last_name: 'Smith') }
  let(:debater_two) { create(:debater, last_name: 'Thompson') }

  describe '#code' do
    context 'when debater two is set' do
      let(:team) { create(:team, school: school, debater_one: debater_one, debater_two: debater_two) }

      it 'returns code with both debaters' do
        expect(team.code).to eq('SIU ST')
      end
    end

    context 'when debater two is not set' do
      let(:team) { create(:team, school: school, debater_one: debater_one, debater_two: nil) }

      it 'returns code with first debater' do
        expect(team.code).to eq('SIU S')
      end
    end
  end
end
