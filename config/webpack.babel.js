import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import AssetMapPlugin from 'asset-map-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import SentrySourcemapPlugin from 'webpack-sentry-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import envRules from './webpack/rules';
import { devServer, publicPath } from './webpack/dev';
import buildEnv from './webpack/env';
import runtime from './webpack/runtime';
import vendor from './webpack/vendor';

const {
  TARGET: target,
  BUNDLE_ANALYZE: bundleAnalyze,
  SENTRY_KEY: sentryKey,
  SENTRY_JS_DSN: sentryDsn,
  HEROKU_SLUG_COMMIT: commit,
} = process.env;
const { deployTarget, namePattern, cssNamePattern } = buildEnv(target);

const resolvedRules = envRules(deployTarget);

const config = {
  entry: {
    application: './app/assets/webpack/application',
    runtime,
    vendor,
  },

  output: {
    path: path.join(__dirname, '..', 'public', 'assets'),
    publicPath: '/assets/',
    filename: `${namePattern}.js`,
  },

  resolve: {
    modules: [
      path.join('app', 'assets'),
      path.join('vendor', 'assets'),
      path.join('app', 'assets', 'stylesheets'),
      path.join('app'),
      'node_modules',
    ],
    extensions: ['.js', '.css'],
  },

  module: {
    rules: resolvedRules,
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'runtime'], minChunks: Infinity }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new StatsPlugin('webpack_manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true,
      warnings: target === 'development',
    }),
  ],
};

if (deployTarget) {
  config.plugins.push(
    new ExtractTextPlugin({ filename: `${cssNamePattern}.css` }),
    new webpack.NoEmitOnErrorsPlugin(),
    new AssetMapPlugin('asset_map.json'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      SENTRY_DSN: JSON.stringify(sentryDsn),
      GITSHA: JSON.stringify(commit),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.SourceMapDevToolPlugin({
      module: true,
      columns: true,
      filename: '[file].map',
      moduleFilenameTemplate: 'file://[resource-path]',
      fallbackModuleFilenameTemplate: 'file://[resource-path]?[hash]',
      append: '\n//# sourceMappingURL=/assets/[url]',
    }),
    new CompressionPlugin({
      asset: '[path].gz',
      test: /\.(css|js)$/,
    })
  );

  if(bundleAnalyze) {
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }

  if(sentryKey) {
    config.plugins.push(
      new SentrySourcemapPlugin({
        organisation: 'schneidmaster',
        project: 'debatevid.io',
        apiKey: sentryKey,
        release: commit,
        include: /\.js(\.map)?$/,
        filenameTransform(filename) {
          return `~/assets/${filename}`;
        },
        releaseBody(version) {
          return {
            version,
            refs: [
              {
                repository: 'schneidmaster/debatevid.io',
                commit: commit,
              },
            ],
            projects: ['debatevid.io'],
          };
        },
      })
    );
  }
} else {
  config.devServer = devServer;
  config.output.publicPath = publicPath;
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      module: true,
      columns: false,
    }),
    new AssetMapPlugin('asset_map.json', path.resolve()),
  );
}

export default config;
