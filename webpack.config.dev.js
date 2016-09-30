var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
        'webpack-hot-middleware/client',
        './src/index'
  ],
  
  output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/build/bundle.js',
        publicPath: '/'
  },
  
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
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
            loader: 'style-loader!css-loader!postcss-loader'
        },
        
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?-autoprefixer&importLoaders=1!postcss-loader!sass-loader'
        },
        
        {
            test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
            loader: "url-loader?mimetype=application/font-woff"
        },
        
        {
            test: /\.(ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/,
            loader: "file-loader"
        },
        
        {
            test: /\.(png|jpg|gif)$/, 
            loader: 'file-loader'
        }
    ]
  },
  
  postcss: function(){
    return [autoprefixer];
  }
};