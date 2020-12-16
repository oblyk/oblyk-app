import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const plugins = [createPersistedState()]
if (debug) plugins.push(createLogger())

export default new Vuex.Store({
  modules: {
    auth
  },
  strict: debug,
  plugins: plugins
})
