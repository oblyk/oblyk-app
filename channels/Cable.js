export const Cable = {
  watch: {
    'this.$auth.loggedIn' () {
      if (this.$auth.loggedIn) {
        this.connectCable()
      } else {
        this.disconnectCable()
      }
    }
  },

  methods: {
    connectCable () {
      if (this.$auth.loggedIn) {
        this.$cable.connection.connect(`${process.env.VUE_APP_OBLYK_API_CABLE_URL}?token=${this.$auth.user.ws_token}`)
      }
    },

    disconnectCable () {
      this.$cable.connection.disconnect()
    }
  }
}
