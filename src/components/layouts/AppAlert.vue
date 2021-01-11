<template>
  <v-alert
    v-model="show"
    class="app-alert"
    :type="type"
    dismissible
  >
    <p class="mb-0" v-for="(message, index) of messages" :key="index">
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
      messages: []
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

  methods: {
    fromApiError: function (err, object) {
      const data = err.response.data
      const status = err.response.status
      this.clear()

      if (status === 500 || status === 400 || status === 401) {
        this.messages.push(this.$t(`components.appAlert.${status}`))
      } else if (status === 422) {
        this.messages.push(this.$t('components.appAlert.422'))
        for (const error in data.error) {
          let item = ''
          if (error !== 'base') item = this.$t(`models.${object}.${error}`)
          for (const rule of data.error[error]) {
            this.messages.push(`- ${item} ${rule}`)
          }
        }
      } else {
        this.messages.push(this.$t('components.appAlert.500'))
      }
      this.show = true
      this.type = 'error'
    },

    simpleError: function (message) {
      this.simpleAlert(message, 'error')
    },

    successAlert: function (message) {
      this.simpleAlert(message, 'success')
    },

    simpleAlert: function (message, type) {
      this.clear()
      this.messages.push(message)
      this.show = true
      this.type = type
    },

    clear: function () {
      this.messages = []
    }
  }
}
</script>

<style lang="scss" scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
}
</style>
