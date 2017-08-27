describe ErrorsController do
  describe '#error_404' do
    subject(:request) { get :error_404 }

    it 'returns 404 response' do
      expect(request).to have_http_status(:not_found)
      expect(request).to render_template(:error_404)
    end
  end

  describe '#error_422' do
    subject(:request) { get :error_422 }

    it 'returns 422 response' do
      expect(request).to have_http_status(:unprocessable_entity)
      expect(request).to render_template(:error_422)
    end
  end

  describe '#error_500' do
    subject(:request) { get :error_500 }

    it 'returns 500 response' do
      expect(request).to have_http_status(:internal_server_error)
      expect(request).to render_template(:error_500)
    end
  end
end
