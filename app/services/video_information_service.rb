class VideoInformationService
  class << self
    def link_info(link)
      is_vimeo = link.include?('vimeo')
      is_youtube = link.include?('youtube') || link.include?('youtu.be')
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

    VALID_YOUTUBE_HOSTS = ['www.youtube.com', 'youtube.com', 'youtu.be'].freeze

    def youtube_link_info(link)
      uri = URI.parse(link)
      return invalid_json unless VALID_YOUTUBE_HOSTS.include?(uri.host)

      id =
        if uri.host == 'youtu.be'
          link.split('/').last
        else
          params = URI.parse(link).request_uri.split('?').last
          params_array = CGI.parse(params)
          params_array['v'].first
        end

      begin
        html = RestClient.get(link)
        return invalid_json unless html.code == 200

        title_node = html.body.match(/<title>(.*)<\/title>/)
        title = title_node.to_s.gsub(/<(\/?)title>/, '').gsub(' - YouTube', '')

        img_node = html.body.match(/<meta property="og:image" content="(.*)">/)
        thumbnail = img_node.to_s.gsub('<meta property="og:image" content="', '').gsub('">', '')
      rescue
        return invalid_json
      end

      {
        provider: 'youtube',
        key: id,
        title: title,
        thumbnail: thumbnail,
      }
    end

    def invalid_json
      { invalid: true }
    end
  end
end
