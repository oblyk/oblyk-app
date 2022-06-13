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
        primary: '#31994e',
        secondary: '#fff',
        third: '#bdbdbd',
        accent: '#2979ff',
        error: '#b71c1c',
        warning: '#fb8c00',
        myMessage: '#f5f5f5'
      },
      dark: {
        primary: '#31994e',
        secondary: '#121212',
        third: '#424242',
        accent: '#448aff',
        error: '#b71c1c',
        warning: '#fb8c00',
        myMessage: '#121212'
      }
    },
    options: { variations: false }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
}
