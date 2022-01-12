// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = { //多页面打包
  pages: {
    main: {
      // 入口js
      entry: 'src/modules/index/index.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist 中生成的html文件名字
      filename: 'index.html',
      // template html 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'iws'
    }
  },
  chainWebpack(config) {
    // svg规则配置，排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    // config.module.rule('py').test(/\.py$/i).use('python-shell').loader('python-shell').end();
    // 新增icons规则，设置svg-sprite-loader
    config.module.rule('icons') // 创建规则 ‘icons’
      .test(/\.svg$/) // 检测的具体目录
      .include.add(resolve('src/icons')) // 只考虑‘src/icons’目录下
      .end()
      .use('svg-sprite-loader') // 运用
      .loader('svg-sprite-loader') // 指定loader
      .options({
        symbolId: 'icon-[name]'
      }).end(); // 选项配置，将来使用图标的名称, 例：icon-qq
  }
};