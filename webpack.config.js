const path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/main-webpack.ts',
  output: {
    filename: 'angular-login-component.js',
    path: path.resolve(__dirname, 'dist-webpack'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json'
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};