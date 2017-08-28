require 'open-uri'

class SitemapController < ApplicationController
  def index
    data = open("https://s3.amazonaws.com/#{ENV['S3_BUCKET_NAME']}/sitemaps/sitemap.xml.gz")
    send_data(data.read, filename: 'sitemap.xml.gz', type: 'application/gzip', stream: true)
  end
end
