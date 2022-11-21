var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  // entry: require('./webpack.config.entry'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.js'
    // filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['*', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src/js'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            { loader: 'sass-loader' },
            {
              loader: 'postcss-loader',
              options: {
                options: {}
              }
            }
          ]
        })
      },
      {
        test: /\.(svg|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader?name=images/[name].[ext]'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [/images/],
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/styles.css')
    // new ExtractTextPlugin('css/[name].css')
  ]

}
