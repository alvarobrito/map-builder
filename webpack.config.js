const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

const resolve = dir => path.join(__dirname, './', dir);

const SOURCE_PATH = resolve('src');
const OUTPUT_PATH = resolve('dist');

module.exports = {
  devtool: 'source-map',
  context: SOURCE_PATH,
  entry: [path.join(SOURCE_PATH, 'main.js')],
  output: {
    path: OUTPUT_PATH,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(html,json)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      SOURCE_PATH,
    ],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: SOURCE_PATH,
    historyApiFallback: true,
    port: 8080,
    compress: false,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
