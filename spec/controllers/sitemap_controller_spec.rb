describe SitemapController do
  describe '#index' do
    subject(:request) { get :index }

    before do
      stub_request(:get, 'https://s3.amazonaws.com/test-debatevidio/sitemaps/sitemap.xml.gz')
        .to_return(status: 200, body: 'abc')
    end

    it 'returns sitemap' do
      expect(request).to have_http_status(:ok)
      expect(request.header['Content-Type']).to eq('application/gzip')
      expect(request.body).to eq('abc')
    end
  end
end
