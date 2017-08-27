describe Tournament do
  describe '#year_and_name' do
    let(:tournament) { create(:tournament, year: '2015', name: 'NPTE') }

    it 'returns year and name' do
      expect(tournament.year_and_name).to eq('2015 NPTE')
    end
  end
end
