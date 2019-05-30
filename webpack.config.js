const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports =  {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
      { 
        test: /\.(js|jsx)?$/, 
        exclude: /node_modules/, 
        use: ['babel-loader'] 
      },
      {
        test: /\.(jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:base64:5].[ext]',
            publicPath: '../',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyPlugin([
      { from: 'public', to: '' },
    ]),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js'
    })
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    }
  },
}
