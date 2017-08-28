import ExtractTextPlugin from 'extract-text-webpack-plugin';

// PostCSS plugins.
import nested from 'postcss-nested';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import vars from 'postcss-simple-vars';
import postcssImport from 'postcss-import';

const commonRules = [
  {
    test: /\.(jpg|jpeg|png|gif|eps|sketch|eot|ttf|woff|woff2|svg|pdf)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          context: 'app/assets',
        },
      },
    ],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['es2015', { modules: false }],
          'react',
        ],
        plugins: [
          ['transform-imports', {
            'react-bootstrap': {
              transform: 'react-bootstrap/es/${member}', // eslint-disable-line no-template-curly-in-string
              preventFullImport: true,
            },
            'redux-form': {
              transform: 'redux-form/es/immutable/${member}', // eslint-disable-line no-template-curly-in-string
              preventFullImport: true,
            },
          }],
        ],
      },
    },
  },
];

const prodRules = [
  {
    test: /\.css$/,
    exclude: /componnets/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins() {
              return [
                nested,
                vars,
                precss,
                autoprefixer,
              ];
            },
          },
        },
      ],
    }),
  },
  {
    test: /\.css$/,
    include: /components/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins() {
              return [
                nested,
                vars,
                precss,
                autoprefixer,
              ];
            },
          },
        },
      ],
    }),
  },
];

const devRules = [
  {
    test: /\.css$/,
    exclude: /components/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins() {
            return [
              postcssImport,
              nested,
              vars,
              precss,
              autoprefixer,
            ];
          },
        },
      },
    ],
  },
  {
    test: /\.css$/,
    include: /components/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins() {
            return [
              postcssImport,
              nested,
              vars,
              precss,
              autoprefixer,
            ];
          },
        },
      },
    ],
  },
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
