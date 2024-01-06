const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: './',
  runtimeCompiler: true,

  transpileDependencies: ['vue-echarts', 'resize-detector'],

  devServer: {
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'http://localhost:9000', //by lyj 나중에 적용할때는 localhost로 변경예정
        //target: 'http://192.168.3.206:9000',
        ws: true,
        changeOrigin: true
      },
      '/com': {
        target: 'http://localhost:9000', //by lyj 나중에 적용할때는 localhost로 변경예정
        //target: 'http://192.168.3.206:9000',
        ws: true,
        changeOrigin: true
      },
      // pdf 테스트 사이트 프록시 설정
      '/pdf': {
        target: 'http://www.orimi.com/',
        // ws: true,
        changeOrigin: true,
        pathRewrite: { '^/pdf': '' }
      },
      // pdf 테스트 사이트 프록시 설정
      '/birtreport': {
        target: 'http://localhost:9091/',
        // ws: true,
        changeOrigin: true,
        pathRewrite: { '^/birtreport': '' }
      }
    },
    overlay: {
      overlay: false
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    devtool: 'source-map'
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      //localeDir: 'locales',
      localeDir: 'i18n',
      enableInSFC: false
    }
  },

  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()

      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
