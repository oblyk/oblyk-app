import Vue from 'vue'
import ActionCableVue from 'actioncable-vue'

if (process.client) {
  Vue.use(ActionCableVue, {
    debug: true,
    debugLevel: 'all',
    connectionUrl: process.env.VUE_APP_OBLYK_API_CABLE_URL,
    connectImmediately: false
  })
}
