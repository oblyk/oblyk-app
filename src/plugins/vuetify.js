import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import fr from 'vuetify/es5/locale/fr'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { fr, en },
    current: 'fr'
  },
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
