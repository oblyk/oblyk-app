export const ThemeColorMixin = {
  watch: {
    '$store.state.theme.theme' () {
      this.setThemeColor()
    }
  },

  mounted () {
    this.setThemeColor()
  },

  methods: {
    setThemeColor () {
      const theme = this.$store.getters['theme/getTheme']
      const metaTheme = document.querySelector('meta[name="theme-color"]')
      const body = document.querySelector('body')
      if (theme === 'dark') {
        metaTheme.setAttribute('content', '#121212')
        body.style.backgroundColor = '#121212'
      } else {
        metaTheme.setAttribute('content', '#ffffff')
        body.style.backgroundColor = '#ffffff'
      }
    }
  }
}
