// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 const AutoImport = require('unplugin-auto-import/webpack')
 const Components = require('unplugin-vue-components/webpack')
 const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
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
      title: 'iGEM-WorkSpace'
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
      }).end(); // 选项配置，将来使用图标的名称
  },
  configureWebpack:{
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        "appId": "this.is.tasky",
        "productName": "iGEM-ToolBox",
        "copyright": "Copyright © 2021 Alaso",
        "directories": {
          "buildResources": "build"
        },
        "mac": {
          "category": "public.app-category.utilities"
        },
        "dmg": {
          "background": "build/background.jfif",
          "icon": "build/icons/icon.icns",
          "iconSize": 100,
          "contents": [
            {
              "x": 380,
              "y": 180,
              "type": "link",
              "path": "/Applications"
            },
            {
              "x": 130,
              "y": 180,
              "type": "file"
            }
          ],
          "window": {
            "width": 540,
            "height": 380
          }
        },
        "win": {
          "target": [
            "msi",
            "nsis"
          ],
          "icon": "build/icons/icon.ico"
        },
        "nsis": {
          "oneClick": false,
          "language": "2052",
          "perMachine": true,
          "allowToChangeInstallationDirectory": true
        }
      }
    }
  }
  
};