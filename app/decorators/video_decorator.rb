class VideoDecorator < Draper::Decorator
  delegate_all

  def video_frame
    if youtube?
      src = "https://www.youtube.com/embed/#{key.first}?origin=https://debatevid.io"
      src += "&playlist=#{key.drop(1).join(',')}" unless key.drop(1).empty?

      content_tag(:iframe,
                  id: 'vidframe',
                  type: 'text/html',
                  src: src,
                  frameborder: '0')
    else
      content_tag(:iframe,
                  id: 'vidframe',
                  src: "https://player.vimeo.com/video/#{key.first}",
                  frameborder: '0',
                  webkitallowfullscreen: 'true',
                  mozallowfullscreen: 'true',
                  allowfullscreen: 'true')
    end
  end
end
