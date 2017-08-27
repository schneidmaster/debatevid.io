describe VideoInformationService do
  describe '#link_info' do
    subject(:link_info) { described_class.link_info(link) }

    context 'invalid link' do
      let(:link) { 'https://www.facebook.com' }

      it 'returns invalid' do
        expect(link_info).to include_json(invalid: true)
      end
    end

    context 'youtube link' do
      let(:link) { 'https://www.youtube.com?v=abc' }

      context 'link exists' do
        before do
          stub_request(:get, 'https://www.googleapis.com/youtube/v3/videos?id=abc&key=youtube-dev&part=snippet')
            .to_return(status: 200, body: { items: [{ snippet: { title: 'Abc vid', thumbnails: { high: { url: 'https://youtube.com/abc/thumb' } } } }] }.to_json)
        end

        it 'returns link info' do
          expect(link_info).to include_json(
            provider: 'youtube',
            key: 'abc',
            title: 'Abc vid',
            thumbnail: 'https://youtube.com/abc/thumb',
          )
        end
      end

      context 'link does not exist' do
        before do
          stub_request(:get, 'https://www.googleapis.com/youtube/v3/videos?id=abc&key=youtube-dev&part=snippet')
            .to_return(status: 404)
        end

        it 'returns invalid' do
          expect(link_info).to include_json(invalid: true)
        end
      end
    end

    context 'vimeo link' do
      let(:link) { 'https://vimeo.com/abc' }

      context 'link exists' do
        before do
          stub_request(:get, 'https://vimeo.com/api/v2/video/abc.json')
            .to_return(status: 200, body: [{ title: 'Abc vid', thumbnail_medium: 'https://vimeo.com/abc/thumb' }].to_json, headers: { 'Content-Type' => 'application/json' })
        end

        it 'returns link info' do
          expect(link_info).to include_json(
            provider: 'vimeo',
            key: 'abc',
            title: 'Abc vid',
            thumbnail: 'https://vimeo.com/abc/thumb',
          )
        end
      end

      context 'link does not exist' do
        before do
          stub_request(:get, 'https://vimeo.com/api/v2/video/abc.json')
            .to_return(status: 404)
        end

        it 'returns invalid' do
          expect(link_info).to include_json(invalid: true)
        end
      end
    end
  end
end
