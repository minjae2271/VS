import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - versusApp',
    title: 'versusApp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js',
        charset: 'utf-8'
      },
      { src: 'https://developers.kakao.com/sdk/js/kakao.min.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify', 
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  // monent
  moment: {
    locales: ['ko']
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  axios: {
    browserBaseURL: 'http://localhost:3005',
    baseURL: 'http://localhost:3005',
    https: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extend(config, { isClient, isServer, isDev }) {
      console.log('webpack', config, isServer, isClient);
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
    }
  },

  server: {
    port: process.env.PORT || 3000
  }
};
