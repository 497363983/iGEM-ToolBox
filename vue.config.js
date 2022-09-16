// vue.config.js
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pages: {
    main: {
      entry: 'src/modules/index/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'iGEM-ToolBox'
    }
  },
  chainWebpack(config) {
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      }).end();
  },
  configureWebpack: {
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
      nodeModulesPath: ["./node_modules"],
      externals: ["simple-git"],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        "appId": "this.is.tasky",
        "productName": "iGEM_ToolBox",
        "copyright": "",
        "mac": {
          "category": "public.app-category.utilities"
        },
        "asar": false,

        // "dmg": {
        //   // "background": "build/background.jfif",
        //   // "icon": "build/icons/icon.icns",
        //   "iconSize": 100,
        //   "contents": [{
        //     "x": 380,
        //     "y": 180,
        //     "type": "link",
        //     "path": "/Applications"
        //   },
        //   {
        //     "x": 130,
        //     "y": 180,
        //     "type": "file"
        //   }
        //   ],
        //   "window": {
        //     "width": 540,
        //     "height": 380
        //   }
        // },
        "win": {
          "target": [
            "msi",
            "nsis"
          ],
          // "icon": "build/icons/icon.ico"
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