# This task is called by the Heroku scheduler add-on
 
desc "Update sitemap and ping search engines"
task :update_sitemap => ['sitemap:create'] do
  SitemapGenerator::Sitemap.ping_search_engines('https://www.debatevid.io/sitemap.xml.gz')
end
