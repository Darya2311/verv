const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; 
const isProd = !isDev;

const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: "all"
    }
  }; 

  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return configObj;
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: `./js/${fileName('js')}`,
    path: path.resolve(__dirname, 'app'),
    publicPath: ""
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'app'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pug/index.pug'),
      fileName: 'index.pug',
      minify: {
        collapseWhitespace: isProd
        // minify: false
      }
    }),
    new HtmlWebpackPugPlugin({
     }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${fileName('css')}`
    }),
    new CopyWebpackPlugin ({
      patterns: [
        {from: path.resolve(__dirname, './src/assets'),
         to: path.resolve(__dirname, 'app')
        }
      ]
    })
  ],
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
    },
      {
        test: /\.pug$/,
        use: [
          {
              loader: "html-loader"
          },
          {
              loader: "pug-html-loader",
              options: {
                  "pretty": true
              }
          }
      ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }, 
          },
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }
            },
            'css-loader', 
            'sass-loader'
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [{
            loader: 'file-loader',
                options: {
                name: `./fonts/${fileName('[ext]')}`
                }
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        use: ["babel-loader"],
      }
    ]  
  }
}; 