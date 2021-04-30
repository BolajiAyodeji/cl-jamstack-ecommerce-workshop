const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js', 
  devtool: 'source-map',
  output: {
    filename: 'commercelayer.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    symlinks: false,
  },
  devServer: {
    https: true,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
}