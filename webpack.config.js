const webpack = require( 'webpack' )
const path = require( 'path' )

const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

const dotenv = require( 'dotenv' )

module.exports = ( env, argv ) => {
  return {
    devtool: argv.mode === 'development' ? 'inline-source-map' : 'eval',
    entry: {
      index: '/src/assets/js/index.js'
    },
    output: {
      publicPath: '',
      filename: 'js/[name].bundle.js',
      path: path.resolve( __dirname, 'dist' )
    },
    plugins: [
      new HtmlWebpackPlugin( {
        title: 'Authorize access to your account',
        template: 'public/index.html',
        favicon: 'src/assets/images/favicon.ico'
      } ),
      new webpack.DefinePlugin( {
        'process.env': dotenv.config( {
          path: path.join( __dirname, '.env' )
        } ).parsed
      } ),
      new MiniCssExtractPlugin( {
        filename: argv.mode === 'development'  ? 'css/[name].css' : 'css/[name].[hash].css',
        chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css',
        ignoreOrder: false,
      } ),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '../fonts',
                outputPath: 'fonts',
              }
            }
          ]
        },
        {
          test: /\.(gif|webp|ico|png|jpe?g)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[ext]',
              }
            },
          ]
        }
      ]
    },
    resolve: {
      modules: [ path.resolve( __dirname, 'src' ), 'node_modules' ],
      alias: {
        '@': path.resolve( __dirname, 'src' ),
        '@assets': path.resolve( __dirname, 'src', 'assets' ),
        '@images': path.resolve( __dirname, 'src', 'assets', 'images' ),
        '@icons': path.resolve( __dirname, 'src', 'assets', 'images', 'icons' ),
        '@scss': path.resolve( __dirname, 'src', 'assets', 'scss' ),
        '@js': path.resolve( __dirname, 'src', 'assets', 'js' ),
        '@fonts': path.resolve( __dirname, 'src', 'assets', 'fonts' ),
      }
    },
  }
}
