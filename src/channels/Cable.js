import { SessionConcern } from '@/concerns/SessionConcern'

export const Cable = {
  mixins: [SessionConcern],

  watch: {
    isLoggedIn: function () {
      if (this.isLoggedIn) {
        this.connectCable()
      } else {
        this.disconnectCable()
      }
    }
  },

  methods: {
    connectCable: function () {
      if (this.isLoggedIn) {
        this.$cable.connection.connect(`${process.env.VUE_APP_OBLYK_API_CABLE_URL}?token=${this.getWsToken}`)
      }
    },

    disconnectCable () {
      this.$cable.connection.disconnect()
    }
  }
}
