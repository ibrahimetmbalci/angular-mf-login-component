const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/app/login-form.component.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist-mf'),
    publicPath: 'http://localhost:4200/',
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
  devServer: {
    port: 4200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
};

module.exports = merge(baseConfig, {
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularApp',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginComponent': './src/app/login-form.component.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: false },
        '@angular/common': { singleton: true, strictVersion: false },
        '@angular/elements': { singleton: true, strictVersion: false },
        '@angular/forms': { singleton: true, strictVersion: false },
        '@angular/platform-browser': { singleton: true, strictVersion: false },
        'rxjs': { singleton: true, strictVersion: false },
        'zone.js': { singleton: true, strictVersion: false },
      },
    }),
  ],
});