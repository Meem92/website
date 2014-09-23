###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'img'

set :relative_links, true

# Build-specific configuration
configure :build do
  # Minify css on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # svg's are inlined in the html pages
  ignore 'img/*.svg'

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# Deployment configuration
activate :deploy do |deploy|
  deploy.build_before = true

  deploy.method = :ftp

  deploy_config = YAML.load(File.read 'deploy.yml') rescue nil
  if deploy_config.kind_of? Hash
    deploy.host     = deploy_config['host']
    deploy.path     = deploy_config['path']
    deploy.user     = deploy_config['user']
    deploy.password = deploy_config['password']
  end
end
