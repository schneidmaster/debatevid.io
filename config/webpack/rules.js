import MiniCssExtractPlugin from "mini-css-extract-plugin";

// PostCSS plugins.
import nested from "postcss-nested";
import precss from "precss";
import autoprefixer from "autoprefixer";
import vars from "postcss-simple-vars";

const commonRules = [
  {
    test: /\.(jpg|jpeg|png|gif|eps|sketch|eot|ttf|woff|woff2|svg|pdf)/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          context: "app/assets"
        }
      }
    ]
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  }
];

const prodRules = [
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          plugins() {
            return [nested, vars, precss, autoprefixer];
          }
        }
      }
    ]
  }
];

const devRules = [
  {
    test: /\.css$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          plugins() {
            return [nested, vars, precss, autoprefixer];
          }
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
}
