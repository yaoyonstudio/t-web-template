const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const LinkTypePlugin = require('html-webpack-link-type-plugin')
  .HtmlWebpackLinkTypePlugin

const commonChunks = ['vendor', 'commonStyle']

const devMode = process.env.NODE_ENV !== 'production'

function generatePageHtmlPlugins(templateDir, scriptDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]

    const config = {
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      chunks: commonChunks,
    }

    if (scriptDir) {
      const pageScriptFile = path.resolve(__dirname, scriptDir, `${name}.js`)
      try {
        if (fs.existsSync(pageScriptFile)) {
          config.chunks = [...commonChunks, name]
        }
      } catch (err) {
        console.error('Err:', err)
      }
    }

    return new HtmlWebpackPlugin(config)
  })
}

const pageHtmlPlugins = generatePageHtmlPlugins('./src/pages', './src/js')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    vendor: ['./libs/jquery/jquery.js', './css/common.scss'],
    index: ['./js/index.js', './css/index.scss'],
    about: ['./js/about.js'],
    profile: ['./js/profile.js'],
  },
  cache: false,
  watch: devMode,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
  },
  module: {
    rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          devMode ?
          'style-loader' :
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: '/.js$/',
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join('assets', 'img/[name].[ext]'),
          },
        }, ],
      },
      {
        test: '/.(png|jpg|gif)$/',
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'imgs/',
            name: '[path][name].[ext]',
          },
        }, ],
      },
      {
        test: '/.html$/',
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }, ],
      },
    ],
  },
  devServer: {
    compress: true,
    host: '0.0.0.0',
    publicPath: '/assets/',
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 9000,
    inline: true,
    hot: true,
    writeToDisk: true,
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin({}),
    new CopyWebpackPlugin([{
      from: 'img',
      to: 'img',
    }, ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? './css/[name].css' : './css/[name].[hash].css',
      chunkFilename: devMode ? './css/[id].css' : './css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      chunks: commonChunks.concat(['index']),
    }),
    ...pageHtmlPlugins,
    new LinkTypePlugin({
      '**/*.css': 'text/css',
    }),
  ],
}
