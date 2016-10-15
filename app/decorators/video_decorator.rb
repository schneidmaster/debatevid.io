class VideoDecorator < Draper::Decorator
  delegate_all

  def video_frame
    if youtube?
      frame = "<iframe id='vidframe' type='text/html'"
      frame += "src='https://www.youtube.com/embed/#{key.first}?origin=https://debatevid.io"
      frame += "&playlist=#{key.drop(1).join(',')}" if key.drop(1).length > 0
      frame += "' frameborder='0'></iframe>"
      frame.html_safe
    else
      "<iframe id='vidframe' src='https://player.vimeo.com/video/#{key.first}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>".html_safe
    end
  end
end
