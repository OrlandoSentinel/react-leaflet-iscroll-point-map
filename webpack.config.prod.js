var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index',
  
  output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/build/bundle.js?[hash]',
        publicPath: './'
  },
  
  plugins: [
        new ExtractTextPlugin('css/build/app.css?[hash]'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
  ],
  
  module: {
    loaders: [
        {
            test: require.resolve('jquery'),
            loader: 'expose?$!expose?jQuery'
        },
        
        {
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },
        
        {
            test: /\.json?$/,
            loader: 'json-loader'
        },
        
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer!postcss-loader')
        },
        
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&importLoaders=1!postcss-loader!sass-loader')
        },
        
        {
            test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
            loader: "url-loader?mimetype=application/font-woff&name=fonts/build/[name].[ext]?[hash]"
        },
        
        {
            test: /\.(ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/,
            loader: "file-loader?name=fonts/build/[name].[ext]?[hash]"
        },
        
        {
            test: /\.(png|jpg|gif)$/, 
            loader: 'file-loader?name=images/build/[name].[ext]?[hash]'
        }
    ]
  },
  
  postcss: function(){
    return [autoprefixer];
  }
};