const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'spa',
  router: {
    base: '/four-choices-question-memo/'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "4択解答メモ",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'mobile-web-app-capable', content: 'yes'},
      { name: 'apple-mobile-web-app-capable', content: 'yes'},
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/four-choices-question-memo/favicon.ico' },
      { rel: 'shortcut icon', size: '196x196', href: '/four-choices-question-memo/icon-196x196.png'},
      { rel: 'apple-touch-icon', href: '/four-choices-question-memo/icon-196x196.png'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vue-scrollto',
    '~/plugins/firebase',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['vue-scrollto/nuxt', { duration: 300 },],
    '@nuxtjs/axios',
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  generate: {
    dir: 'docs'
  }
}
