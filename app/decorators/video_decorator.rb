class VideoDecorator < Draper::Decorator
  delegate_all

  def video_frame
    if youtube?
      frame = "<iframe id='vidframe' type='text/html'"
      frame += "src='https://www.youtube.com/embed/#{key.first}?origin=https://debatevid.io"
      if key.length > 1
        frame += "&playlist=#{key.join(',')}"
      end
      frame += "' frameborder='0'></iframe>"
      frame.html_safe
    else
      "<iframe id='vidframe' src='https://player.vimeo.com/video/#{key.first}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>".html_safe
    end
  end
end
