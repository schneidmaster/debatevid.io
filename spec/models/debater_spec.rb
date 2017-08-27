describe Debater do
  let(:debater) { create(:debater, first_name: 'John', last_name: 'Doe') }

  describe '#code_letter' do
    it 'returns first letter of last name' do
      expect(debater.code_letter).to eq('D')
    end
  end

  describe '#name' do
    it 'returns full name' do
      expect(debater.name).to eq('John Doe')
    end
  end

  describe '#name=' do
    it 'sets first and last name from full name' do
      debater.name = 'John Doe'
      expect(debater.first_name).to eq('John')
      expect(debater.last_name).to eq('Doe')
    end
  end
end
