module.exports = {
  entry:  {
    app: "./lib/app.js"
  },
  output: {
    filename: "./public/[name].js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
