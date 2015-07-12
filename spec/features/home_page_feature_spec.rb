feature 'Home Page' do
  let!(:video) { create :video }

  before { visit root_path }

  it 'displays videos on home page' do
    expect(page).to have_content(video.title)
  end

  it 'does not display live or featured video sections' do
    expect(page).not_to have_content('Live Now')
    expect(page).not_to have_content('Featured Videos')
  end

  context 'with featured videos' do
    before do
      create :video, :featured
      visit root_path
    end

    it 'displays featured video section' do
      expect(page).to have_content('Featured Videos')
    end
  end

  context 'with live videos' do
    before do
      create :video, :live
      visit root_path
    end

    it 'displays live video section' do
      expect(page).to have_content('Live Now')
    end
  end
end
