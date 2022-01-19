<template>
  <v-alert
    v-model="show"
    class="app-alert"
    :type="type"
    dismissible
  >
    <p v-for="(message, index) of messages" :key="index" class="mb-0">
      {{ message }}
    </p>
  </v-alert>
</template>

<script>
export default {
  name: 'AppAlert',

  data () {
    return {
      show: false,
      type: 'error',
      messages: [],
      timerBeforeClosing: null
    }
  },

  watch: {
    show () {
      if (this.show) { this.hideAlert() }
    }
  },

  mounted () {
    this.$root.$on('alertFromApiError', (err, object) => {
      this.fromApiError(err, object)
    })

    this.$root.$on('alertSimpleError', (message) => {
      this.simpleError(message)
    })

    this.$root.$on('alertSimpleSuccess', (message) => {
      this.successAlert(message)
    })
  },

  beforeDestroy () {
    this.$root.$off('alertFromApiError')
    this.$root.$off('alertSimpleError')
    this.$root.$off('alertSimpleSuccess')
  },

  methods: {
    fromApiError (err, object) {
      if (err.data !== undefined && err.data.go_fly_a_kite) { return }

      const data = err.response.data
      const status = err.response.status
      this.clear()

      if (status === 500 || status === 400 || status === 401) {
        this.messages.push(this.$t(`components.appAlert.${status}`))
      } else if (status === 422) {
        this.messages.push(this.$t('components.appAlert.422'))
        for (const error in data.error) {
          let item = ''
          if (error !== 'base') { item = this.$t(`models.${object}.${error}`) }
          for (const rule of data.error[error]) {
            this.messages.push(`- ${item} ${this.$t(`errors.rules.${rule}`)}`)
          }
        }
      } else {
        this.messages.push(this.$t('components.appAlert.500'))
      }
      this.show = true
      this.type = 'error'
    },

    simpleError (message) {
      this.simpleAlert(message, 'error')
    },

    successAlert (message) {
      this.simpleAlert(message, 'success')
    },

    simpleAlert (message, type) {
      this.clear()
      this.messages.push(message)
      this.show = true
      this.type = type
    },

    clear () {
      this.messages = []
    },

    hideAlert () {
      if (this.timerBeforeClosing) { clearTimeout(this.timerBeforeClosing) }
      this.timerBeforeClosing = setTimeout(() => { this.show = false }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 300;
}
</style>
