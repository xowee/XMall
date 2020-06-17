const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'common': 'components/common',
        'content': 'components/content',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/style/*.scss')
      ]
    }
  }
}
