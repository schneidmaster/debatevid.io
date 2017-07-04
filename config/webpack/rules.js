import ExtractTextPlugin from 'extract-text-webpack-plugin';

let commonRules = [
  {
    test: /\.(jpg|jpeg|png|gif|eps|sketch|eot|ttf|woff|woff2|svg|pdf)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          context: 'app/assets'
        }
      }
    ]
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }
    ]
  }
];

let prodRules = [
  {
    test: /\.(css|scss)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins() { return [
              require('precss'),
              require('autoprefixer')
            ]; }
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    })
  }
];

let devRules = [
  {
    test: /\.(css|scss)$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins() { return [
            require('precss'),
            require('autoprefixer')
          ]; }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }
];

export default function(deployTarget) {
  // Collect correct rules for environment.
  let rules = commonRules;
  if (deployTarget) {
    rules = rules.concat(prodRules);
  } else {
    rules = rules.concat(devRules);
  }

  return rules;
};
