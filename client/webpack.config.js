const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { entriesJS, entriesPug } = require('./webpack/entries')

const paths = {
  output: './public',
  public: '/public'
}

const webpackConfig = {
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js', '.sass', '.pug'],
    alias: {
      '|Assets': path.resolve(__dirname, './src/assets'),
      '|Components': path.resolve(__dirname, './src/components'),
      '|Views': path.resolve(__dirname, './src/views')
    }
  },
  entry: entriesJS,
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, paths.output),
    publicPath: paths.public
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {loader: 'file-loader', options: {
            // name (file) {
            //   const origin = file.split('\\')
            //   origin.splice(-1, 1)
            //   const folder = origin.pop()
            // }
            name: 'assets/server/images/[name].[ext]',
            publicPath: paths.public
          }},
          // {loader: 'image-webpack-loader'}
        ]
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: paths.public,
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: loader => [
                require('autoprefixer')(),
                require('cssnano')()
              ]
            }},
            {loader: 'sass-loader'}
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /webpack/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]/[name].css',
      disable: false,
      allChunks: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, paths.output),
    compress: true,
    stats: 'errors-only',
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/board\/.*$/, to: context => {
          const view = context.parsedUrl.pathname.split('/').pop()
          const viewBoard = 'board' + view.charAt(0).toUpperCase()+view.slice(1)
          return `${paths.public}/${viewBoard}/${viewBoard}.html`
        }}
      ]
    }
  }
}

Object.keys(entriesPug).map(key => {
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    hash: true,
    inject: 'body',
    template: `./src/views/${entriesPug[key]}`,
    filename: `${key}/${key}.html`
  }))
})

module.exports = webpackConfig
