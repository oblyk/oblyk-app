import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1e88e5',
        secondary: '#fff',
        accent: '#2979ff',
        error: '#b71c1c'
      },
      dark: {
        primary: '#1565c0',
        secondary: '#121212',
        accent: '#448aff',
        error: '#b71c1c'
      }
    }
  }
})
