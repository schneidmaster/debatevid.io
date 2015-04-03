class VideoInformationService
  class << self
    def link_info(link)
      is_vimeo = link.include? "vimeo"
      is_youtube = link.include? "youtube"
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
      return invalid_json if object.response.code == "404"
      raw_info = object.first
      {
        key: id,
        title: raw_info['title'],
        thumbnail: raw_info['thumbnail_medium']
      }
    end

    def youtube_link_info(link)
      params = URI.parse(link).request_uri.split('?').last
      params_array = CGI::parse(params)
      id = params_array['v'].first
      client = YouTubeIt::Client.new(dev_key: ENV['YOUTUBE_DEV_KEY'])
      begin
        raw_info = client.video_by(id)
      rescue
        return invalid_json
      end
      {
        key: id,
        title: raw_info.title,
        thumbnail: raw_info.thumbnails.select{|t| t.name == "default"}.first.url
      }
    end

    def invalid_json
      { invalid: true }
    end
  end
end