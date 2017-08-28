feature 'Video', :needs_assets do
  let(:video) { create(:video) }

  scenario 'sets metadata' do
    visit video_path(video)
    expect(page).to have_meta('og:title', video.title)
    expect(page).to have_title(video.title)
  end
end
