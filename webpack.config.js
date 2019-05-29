const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports =  {
  entry: {
    main: './src/index.js',
    sw: './src/sw.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
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
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: './public/manifest.json'
    // })
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
