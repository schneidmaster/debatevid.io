describe School do
  describe '#name_for_code' do
    context 'when short name is set' do
      let(:school) { create(:school, name: 'Southern Illinois University', short_name: 'SIU') }

      it 'returns short name' do
        expect(school.name_for_code).to eq('SIU')
      end
    end

    context 'when short name is nil' do
      let(:school) { create(:school, name: 'Southern Illinois University', short_name: nil) }

      it 'returns full name' do
        expect(school.name_for_code).to eq('Southern Illinois University')
      end
    end
  end
end
