module ActionView
  module Helpers
    module AssetUrlHelper
      def compute_asset_path(source, options = {})
        # PATCH
        if options[:type] == :image
          asset_map[source]
        else
          dir = ASSET_PUBLIC_DIRECTORIES[options[:type]] || ''
          File.join(dir, source)
        end
      end

      private

      def asset_map
        return @asset_map if @asset_map

        translated = {}
        asset_manifest['assets'].each do |asset, mapped|
          next unless asset.include?('app/assets/images')
          asset_tail = asset.split('app/assets/images/').last
          mapped_tail = mapped.split('/assets/').last
          translated[asset_tail] = "/assets/#{mapped_tail}"
        end
        if Rails.env.development?
          translated
        else
          @asset_map = translated
        end
      end

      def asset_manifest
        return @asset_manifest if @asset_manifest

        if Rails.env.development? || (Rails.env.test? && ENV['CI'] != 'true')
          host = ::Rails.configuration.webpack.dev_server.manifest_host
          port = ::Rails.configuration.webpack.dev_server.manifest_port
          http = Net::HTTP.new(host, port)
          http.use_ssl = ::Rails.configuration.webpack.dev_server.https
          http.verify_mode = OpenSSL::SSL::VERIFY_NONE
          JSON.parse(http.get('/assets/asset_map.json').body)
        else
          @asset_manifest = JSON.parse(File.read(Rails.root.join(Rails.configuration.webpack.output_dir, 'asset_map.json')))
        end
      end
    end
  end
end
