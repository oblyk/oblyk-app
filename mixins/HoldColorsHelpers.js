export const HoldColorsHelpers = {
  data () {
    return {
      colors: [
        { text: this.$t('colors.noColor'), value: '#00000000', simple: false },
        { text: this.$t('colors.white'), value: '#f2f2f2', simple: true },
        { text: this.$t('colors.grey'), value: '#999999', simple: true },
        { text: this.$t('colors.black'), value: '#1a1a1a', simple: true },
        { text: this.$t('colors.blue'), value: '#0055d4', simple: true },
        { text: this.$t('colors.pastelBlue'), value: '#aaccff', simple: false },
        { text: this.$t('colors.navyBlue'), value: '#003380', simple: false },
        { text: this.$t('colors.fluorescentBlue'), value: '#2ad4ff', simple: false },
        { text: this.$t('colors.green'), value: '#2ca02c', simple: true },
        { text: this.$t('colors.pastelGreen'), value: '#afe9af', simple: false },
        { text: this.$t('colors.firGreen'), value: '#165016', simple: false },
        { text: this.$t('colors.fluorescentGreen'), value: '#00ff00', simple: false },
        { text: this.$t('colors.purple'), value: '#ab37c8', simple: true },
        { text: this.$t('colors.pastelPurple'), value: '#e9afdd', simple: false },
        { text: this.$t('colors.deepPurple'), value: '#440055', simple: false },
        { text: this.$t('colors.pink'), value: '#ff2ad4', simple: true },
        { text: this.$t('colors.red'), value: '#ff0000', simple: true },
        { text: this.$t('colors.pastelRed'), value: '#ffaaaa', simple: false },
        { text: this.$t('colors.darkRed'), value: '#800000', simple: false },
        { text: this.$t('colors.fluorescentRed'), value: '#ff1744', simple: false },
        { text: this.$t('colors.orange'), value: '#ff6600', simple: true },
        { text: this.$t('colors.pastelOrange'), value: '#ffccaa', simple: false },
        { text: this.$t('colors.darkOrange'), value: '#bf360c', simple: false },
        { text: this.$t('colors.fluorescentOrange'), value: '#fc552a', simple: false },
        { text: this.$t('colors.yellow'), value: '#ffcc00', simple: true },
        { text: this.$t('colors.pastelYellow'), value: '#ffeeaa', simple: false },
        { text: this.$t('colors.darkYellow'), value: '#f57f17', simple: false },
        { text: this.$t('colors.fluorescentYellow'), value: '#eaff09', simple: false },
        { text: this.$t('colors.brown'), value: '#a05a2c', simple: true },
        { text: this.$t('colors.beige'), value: '#f5f5dc', simple: false }
      ]
    }
  },

  methods: {
    simpleColors () {
      const colors = []
      for (const color of this.colors) {
        if (color.simple) {
          colors.push(color)
        }
      }
      return colors
    },

    hexColorToName (hexColor) {
      for (const color of this.colors) {
        if (color.value === hexColor) {
          return color.text
        }
      }
      return null
    }
  }
}
