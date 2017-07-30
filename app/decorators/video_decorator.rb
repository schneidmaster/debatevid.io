class VideoDecorator < Draper::Decorator
  delegate_all

  def video_frame
    if youtube?
      src = "https://www.youtube.com/embed/#{key.first}?origin=https://debatevid.io"
      src += "&playlist=#{key.drop(1).join(',')}" unless key.drop(1).empty?

      h.content_tag(:iframe, nil,
                    id: 'vidframe',
                    type: 'text/html',
                    src: src,
                    frameborder: '0')
    else
      h.content_tag(:iframe, nil,
                    id: 'vidframe',
                    src: "https://player.vimeo.com/video/#{key.first}",
                    frameborder: '0',
                    webkitallowfullscreen: 'true',
                    mozallowfullscreen: 'true',
                    allowfullscreen: 'true')
    end
  end
end
