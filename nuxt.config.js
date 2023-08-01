import pwaIcons from './pwa-icons.options'
require('dotenv').config()

export default {
  server: {
    port: process.env.VUE_APP_OBLYK_APP_PORT
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: process.env.VUE_APP_OBLYK_API_URL }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/actioncable-vue', mode: 'client' },
    { src: '~/plugins/persisted-state.client.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // https://nuxtjs.org/docs/configuration-glossary/configuration-modern/
  modern: process.env.VUE_APP_BUILD_MODERN === 'true',

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
    '@nuxtjs/dotenv',
    // https://github.com/dword-design/nuxt-route-meta
    'nuxt-route-meta',
    // Rebuilds the router by taking out the routes that should not be in their parents
    '~/modules/router.orphan'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/pimlie/nuxt-matomo
    ['nuxt-matomo', {
      matomoUrl: process.env.VUE_APP_MATOMO_URL,
      siteId: process.env.VUE_APP_MATOMO_SITE_ID
    }],
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots'
  ],

  robots: () => {
    return {
      UserAgent: '*',
      Disallow: process.env.VUE_APP_OBLYK_APP_STAGING === 'true' ? '/' : ''
    }
  },

  router: {
    middleware: 'maintenance'
  },

  // https://auth.nuxtjs.org/
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: false,
          maxAge: 24 * 3600 // one day
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 24 * 3600 * 90 // 3 months
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
    },
    plugins: [{ src: '~/plugins/axios', ssr: true }]
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
      theme_color: '#121212',
      background_color: '#121212',
      orientation: 'any',
      scope: `${process.env.VUE_APP_OBLYK_APP_URL}`,
      start_url: `${process.env.VUE_APP_OBLYK_APP_URL}?standalone=true`,
      related_applications: [
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=org.oblyk.twa',
          id: 'org.oblyk.twa'
        }
      ],
      categories: [
        'social',
        'sports'
      ],
      ...pwaIcons
    },
    meta: {
      name: 'Oblyk - Climbing Community',
      author: 'Oblyk Community',
      description: 'Oblyk est un site participatif d\'escalade outdoor et indoor, vous pouvez consulter les informations des falaises, noter ses croix, trouver un partenaire d\'escalade, etc.',
      theme_color: '#121212',
      lang: 'fr'
    },
    icon: false
  },

  loading: {
    color: '#31994E',
    height: '3px'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: './vuetify.options.js',
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
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
    lazy: {
      skipNuxtState: true
    },
    langDir: 'lang/'
  },

  moment: {
    locales: ['fr', 'en-gb']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isClient }) {
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
    extractCSS: {
      ignoreOrder: true
    }
  }
}
