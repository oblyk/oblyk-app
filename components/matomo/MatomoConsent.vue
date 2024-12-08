<template>
  <div>
    <v-checkbox
      v-model="refused"
      :label="$t('components.matomoConsent.label')"
      :disabled="disabled"
      @click="switchConsent"
    />
  </div>
</template>

<script>
export default {
  name: 'MatomoConsent',

  data () {
    return {
      refused: false,
      disabled: true
    }
  },

  mounted () {
    this.getConsent()
  },

  methods: {
    getConsent () {
      this.refused = this.getCookie('matomo_ignore') === 'ignore'
      this.disabled = false
    },

    switchConsent () {
      this.disabled = true
      if (this.refused) {
        this.setCookie('matomo_ignore', 'ignore', 3650)
      } else {
        this.eraseCookie('matomo_ignore')
      }
      this.getConsent()
    },

    setCookie (name, value, days) {
      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = `; expires=${date.toUTCString()}`
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    },

    getCookie (name) {
      const nameEQ = name + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length)
        }
      }
      return null
    },

    eraseCookie (name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  }
}
</script>
