module.exports = {
  entry: "./lib/app.js",
  output: {
    filename: "./public/app.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};