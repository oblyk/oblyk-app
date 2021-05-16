import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'
import './services/axios'
import './services/nprogress'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'
import ActionCableVue from 'actioncable-vue'

Vue.config.productionTip = false

Vue.component(VueQrcode.name, VueQrcode)
Vue.use(VueClipboard)

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

function loadLocaleMessages (lang) {
  return {
    ...require(`./locales/${lang}/actions.json`),
    ...require(`./locales/${lang}/colors.json`),
    ...require(`./locales/${lang}/common.json`),
    ...require(`./locales/${lang}/components.json`),
    ...require(`./locales/${lang}/models.json`),
    ...require(`./locales/${lang}/termsOfUse.json`),
    ...require(`./locales/${lang}/meta.json`),
    ...require(`./locales/${lang}/home.json`),
    ...require(`./locales/${lang}/helps.json`)
  }
}

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr: loadLocaleMessages('fr'),
    en: loadLocaleMessages('en')
  }
})

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectImmediately: false
})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
