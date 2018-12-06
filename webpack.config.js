var path = require('path')
var webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')
var pixiModule = path.join(__dirname, '/node_modules/pixi.js/')

let config = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
      path: __dirname,
      filename: "./build/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: "file-loader",
        options: {
          outputPath: 'assets/',
          emitFile: true
        }
      },
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') },
      { test: /\.js$/, include: path.join(__dirname, 'node_modules', 'pixi.js'), loader: 'transform?brfs'},
      { test: /\.json$/, include: path.join(__dirname, 'node_modules', 'pixi.js'), loader: 'json'},
      // We expose the non minified pixi file as a global. The minified one was not working with our solution
    ],
  },
  resolve: {
    alias: {
      'pixi': pixiModule,
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets'),
        to: 'assets',
        ignore: ['.*']
      }
    ])
  ]
};

module.exports = config
