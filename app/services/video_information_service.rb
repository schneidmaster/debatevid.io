class VideoInformationService
  class << self
    def link_info(link)
      is_vimeo = link.include? "vimeo"
      is_youtube = link.include? "youtube"
      return nil unless is_vimeo || is_youtube

      if is_vimeo
        id = URI.parse(link).request_uri[1..-1].split('?').first
        puts id
        raw_info = Vimeo::Simple::Video.info(id).first
        {
          title: raw_info['title'],
          thumbnail: raw_info['thumbnail_medium']
        }
      else
        params = URI.parse(link).request_uri.split('?').last
        params_array = CGI::parse(params)
        id = params_array['v'].first
        client = YouTubeIt::Client.new(dev_key: ENV['YOUTUBE_DEV_KEY'])
        raw_info = client.video_by(id)
        {
          title: raw_info.title,
          thumbnail: raw_info.thumbnails.select{|t| t.name == "default"}.first
        }
      end
    end
  end
end