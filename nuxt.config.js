export default {
  server: {
    port: 4500
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'oblyk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/variables.scss',
    '@/assets/main.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/actioncable-vue', ssr: false },
    { src: '~/plugins/persisted-state.client.js', srr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // https://nuxtjs.org/docs/configuration-glossary/configuration-modern/
  modern: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/markdownit-module
    '@nuxtjs/markdownit'
  ],

  // https://auth.nuxtjs.org/
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: false,
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 24 * 3600
        },
        user: {
          property: false
        },
        endpoints: {
          login: {
            url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1/sessions/sign_in`,
            headers: { HttpApiAccessToken: `${process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN}` },
            method: 'post'
          },
          refresh: {
            url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1/sessions/tokens`,
            headers: { HttpApiAccessToken: `${process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN}` },
            method: 'post'
          },
          logout: {
            url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1/sessions/sign_in`,
            headers: { HttpApiAccessToken: `${process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN}` },
            method: 'delete'
          },
          user: {
            url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1/current_users`,
            headers: { HttpApiAccessToken: `${process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN}` },
            method: 'get'
          }
        }
      }
    },
    redirect: {
      login: '/sign-in',
      logout: '/',
      callback: '/sign-in',
      home: false
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Oblyk - Climbing Community',
      short_name: 'Oblyk',
      description: 'Oblyk est un site participatif d\'escalade outdoor et indoor, vous pouvez consulter les informations des falaises, noter ses croix, trouver un partenaire d\'escalade, etc.',
      author: 'Oblyk Community',
      lang: 'fr',
      theme_color: '#170b28',
      background_color: '#170b28'
    },
    meta: {
      name: 'Oblyk - Climbing Community',
      author: 'Oblyk Community',
      description: 'Oblyk est un site participatif d\'escalade outdoor et indoor, vous pouvez consulter les informations des falaises, noter ses croix, trouver un partenaire d\'escalade, etc.',
      theme_color: '#170b28',
      lang: 'fr'
    }
  },

  loading: {
    color: '#1e88e5',
    height: '3px'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: './vuetify.options.js',
    defaultAssets: false,
    treeShake: true
  },

  // i18n module configuration: https://i18n.nuxtjs.org/
  i18n: {
    defaultLocale: 'fr',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.js'
      }
    ],
    lazy: true,
    langDir: 'lang/'
  },

  moment: {
    locales: ['fr', 'en-gb']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
