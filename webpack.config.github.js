const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = {
  mode: 'production',
  entry: './src/app/login-form.component.ts',
  output: {
    filename: '[name].js', // GitHub Pages için sabit isimler
    path: path.resolve(__dirname, 'docs'), // GitHub Pages 'docs' klasörünü kullanır
    publicPath: 'auto',
    clean: true,
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

module.exports = merge(baseConfig, {
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularApp',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginComponent': './src/app/login-form.component.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/elements': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/forms': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/platform-browser': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
        'rxjs': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
        'zone.js': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
      },
    }),
  ],
});