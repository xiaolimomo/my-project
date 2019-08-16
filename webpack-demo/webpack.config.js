const path = require('path');//指定编译的目录
const HtmlWebpackPlugin = require('html-webpack-plugin');//有了这个插件，就可以将我们js文件插入到html文件之中,在js文件后面添加hash值
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    mode:"development",//打包为开发模式
    entry:{
       "js/main": __dirname+'/src/script/main.js',//要使用绝对路径(entry中的key可以指定打包js所在文件夹)
       "js/index": __dirname+'/src/script/index.js'
    },
    plugins:[
        new CleanWebpackPlugin(),//里面不用加路径，否则会报错,每次打包删除原有的打包文件
        new HtmlWebpackPlugin({
            chunks:['js/index'],
            filename:'view/first.html',//打包后的名字
            template:__dirname+'/src/main.html',//模板文件
            minify:{
                collapseWhitespace:true
            },
          
        }),
        new HtmlWebpackPlugin({
            chunks:['js/main'],//引入指定的js文件
            filename:'view/index.html',//打包后的名字(并可指定所在文件夹)
            template:__dirname+'/src/index.html',//模板
            minify:{
                collapseWhitespace:true
            },
          
        }),
        new ExtractTextPlugin('style.css')
        
    ],
    output:{
        publicPath:'../',//指定html打包后中引js的虚拟目录
        path:path.resolve(__dirname,'dist/'),
        filename:'[name].[hash].js'
    },
    module:{
        rules:[{
            test:/\.scss$/,  //正则表达式匹配.scss后缀的文件
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader','sass-loader'] //注意先后顺序
            })
           
        }]
    },
  

}