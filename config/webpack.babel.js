import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import AssetMapPlugin from "asset-map-webpack-plugin";
import StatsPlugin from "stats-webpack-plugin";
import SentrySourcemapPlugin from "webpack-sentry-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import envRules from "./webpack/rules";
import { devServer, publicPath } from "./webpack/dev";
import buildEnv from "./webpack/env";
import vendor from "./webpack/vendor";

const {
  TARGET: target,
  BUNDLE_ANALYZE: bundleAnalyze,
  SENTRY_KEY: sentryKey,
  SENTRY_JS_DSN: sentryDsn,
  SOURCE_VERSION: commit
} = process.env;
const { deployTarget, namePattern, cssNamePattern } = buildEnv(target);

const resolvedRules = envRules(deployTarget);

const config = {
  entry: {
    application: "./app/assets/webpack/application",
    vendorModules: vendor
  },

  mode: deployTarget ? "production" : "development",

  output: {
    path: path.join(__dirname, "..", "public", "assets"),
    publicPath: "/assets/",
    filename: `${namePattern}.js`
  },

  resolve: {
    modules: [
      path.join("app", "assets"),
      path.join("vendor", "assets"),
      path.join("app", "assets", "stylesheets"),
      path.join("app"),
      "node_modules"
    ],
    extensions: [".js", ".css"]
  },

  module: {
    rules: resolvedRules
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          name: "vendor",
          test: "vendorModules",
          enforce: true,
          chunks: "all"
        }
      }
    }
  },

  plugins: [
    new StatsPlugin("webpack_manifest.json", {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true,
      warnings: target === "development"
    })
  ]
};

if (deployTarget) {
  config.devtool = "source-map";
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: `${cssNamePattern}.css`
    }),
    new AssetMapPlugin("asset_map.json"),
    new webpack.DefinePlugin({
      SENTRY_DSN: JSON.stringify(sentryDsn),
      GITSHA: JSON.stringify(commit)
    }),
    new CompressionPlugin({
      test: /\.(css|js)$/
    })
  );

  if (bundleAnalyze) {
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "static" }));
  }

  if (sentryKey) {
    config.plugins.push(
      new SentrySourcemapPlugin({
        organisation: "schneidmaster",
        project: "debatevidio",
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
                repository: "schneidmaster/debatevid.io",
                commit: commit
              }
            ],
            projects: ["debatevidio"]
          };
        }
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
      columns: false
    }),
    new AssetMapPlugin("asset_map.json", path.resolve())
  );
}

export default config;
