const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(config, {
  mode: 'production',
  entry: {
    "index":'./src/tools',
  },
  externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  output: {
    filename: ({chunk}) => {
      let name = chunk.name;
      if ( name === 'index' ) {
        return `index.js`
      }
      return `[name]/index.js`
    },
    path: path.resolve(__dirname, '../lib'),
    libraryTarget: 'umd',
    publicPath: '/lib/'
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['lib']
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        warning: "verbose",
        ecma: 6,
        beautify: false,
        compress: false,
        comments: false,
        mangle: false,
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true
      }
    })
]
}) ;