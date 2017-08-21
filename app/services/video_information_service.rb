class VideoInformationService
  class << self
    def link_info(link)
      is_vimeo = link.include? 'vimeo'
      is_youtube = link.include? 'youtube'
      return invalid_json unless is_vimeo || is_youtube

      if is_vimeo
        vimeo_link_info(link)
      else
        youtube_link_info(link)
      end
    end

    private

    def vimeo_link_info(link)
      id = URI.parse(link).request_uri[1..-1].split('?').first
      object = Vimeo::Simple::Video.info(id)
      return invalid_json if object.response.code == '404'
      raw_info = object.first
      {
        provider: 'vimeo',
        key: id,
        title: raw_info['title'],
        thumbnail: raw_info['thumbnail_medium'],
      }
    end

    def youtube_link_info(link)
      params = URI.parse(link).request_uri.split('?').last
      params_array = CGI.parse(params)
      id = params_array['v'].first

      begin
        raw_info = RestClient.get 'https://www.googleapis.com/youtube/v3/videos', params: { key: ENV['YOUTUBE_DEV_KEY'], part: 'snippet', id: id }
      rescue
        return invalid_json
      end

      raw_info = JSON.parse(raw_info)
      item = raw_info['items'].first
      return invalid_json unless item

      {
        provider: 'youtube',
        key: id,
        title: item['snippet']['title'],
        thumbnail: item['snippet']['thumbnails']['high']['url'],
      }
    end

    def invalid_json
      { invalid: true }
    end
  end
end
