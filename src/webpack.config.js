/**
 * Webpack configuration
 *
 */
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJSON       = require('./package.json');

// Fetch all app vendor dependencies from package.json
var dependencies      = Object.keys(packageJSON.dependencies);
var appSettings       = packageJSON["app-settings"];

// General configuration
var config = {

  /**
   * Root context
   */
  context: __dirname,

  /**
   * Bundle entry points
   */
  entry: {
    // Application entry point, with dev server path for livereload to work
    app: ["./js/app.js"],
    // Array of all external libs to be put into separate vendor output
    vendor: dependencies,
    // Style entry point
    sass: "./sass/style.sass"
  },

  /**
   * Output file settings
   */
  output: {
    path: __dirname + "/../app/assets/js/",
    publicPath: "/assets/",
    filename: "[name].bundle.js"
  },

  /**
   * Plugins to use
   */
  plugins: [
    // Remove vendor files from blundle and split in to different output file.
    new webpack.optimize.CommonsChunkPlugin("vendor", "[name].bundle.js"),

    // Optimize occurence order
    new webpack.optimize.OccurenceOrderPlugin(),

    // ExtractTextPlugin('style.css'),
  ],

  /**
   * devTools
   */
  devtool: "source-map",

  /**
   * Module settings
   */
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /(\.css\.scss|\.sass)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "style!css!autoprefixer!sass?outputStyle=expanded&indentedSyntax"
      }
    ],
  },

  /**
   * Resolve settings
   */
  resolve: {
    root: __dirname + "/js/",
  }
};

module.exports = config;
