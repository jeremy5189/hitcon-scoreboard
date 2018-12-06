const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const pixiModule = path.join(__dirname, '/node_modules/pixi.js/')

const config = {
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
