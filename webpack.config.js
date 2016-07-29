var LiveReloadPlugin = require('webpack-livereload-plugin');
var glob = require('glob');

module.exports = {
  entry: glob.sync('./src/**/!(index).ts').concat(['./src/index.ts']),
  output: {
    path: './www/cgl',
    filename: 'index.js',
    library: 'cgl',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', "", ".webpack.js", ".web.js", ".js"]
  },
  //devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|web_modules)/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin()
  ]
};