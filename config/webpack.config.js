const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css插件

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
      },
      { 
        test: /\.(jpg|png|gif|bmp|jpeg)$/, 
        loader: 'file-loader',
        options: {
          name: "images/[name].[ext]"
        }
      },
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      moduleFilename: ({name}) => {
        if ( name === 'index') {
          return '[name].css'
        }
        return '[name]/index.css'
      }, //如果需要将css文件单独放入css文件夹中需要../
    })
  ],
  
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve('src'),
    }
  }
};
