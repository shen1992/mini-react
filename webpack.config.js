const path = require('path')
const webpack = require('webpack')

const isDevMode = process.env.NODE_ENV !== 'production'

const plugins = [
  new webpack.DefinePlugin({
    '"process.env.NODE_ENV"': isDevMode ? 'development' : 'production'
  })
]

if (!isDevMode) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }))
}

const config = {
  entry: './src/index.js',
  output: {
    filename: `webpack${isDevMode ? '' : '.min'}.js`,
    path: path.resolve(__dirname, 'lib')
  },
  plugins: plugins,
  module: {
    rules: [
      { test: /\.js$/, include: [path.resolve(__dirname, 'src')], loader: "babel-loader" }
    ]
  }
}
if (isDevMode) {
  config.devtool = 'source-map'
}

module.exports = config
