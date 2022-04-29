import fr from 'vuetify/es5/locale/fr'
import en from 'vuetify/es5/locale/en'

export default {
  customVariables: ['~/assets/variables.scss'],
  lang: {
    locales: { fr, en },
    current: 'fr'
  },
  theme: {
    themes: {
      light: {
        primary: '#01579b',
        secondary: '#fff',
        third: '#bdbdbd',
        accent: '#2979ff',
        error: '#b71c1c',
        warning: '#fb8c00',
        myMessage: '#f5f5f5'
      },
      dark: {
        primary: '#1565c0',
        secondary: '#121212',
        third: '#424242',
        accent: '#448aff',
        error: '#b71c1c',
        warning: '#fb8c00',
        myMessage: '#121212'
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
}
