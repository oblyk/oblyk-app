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
        this.$cable.connection.connect(`ws://localhost:3000/cable?token=${this.getWsToken}`)
      }
    },

    disconnectCable () {
      this.$cable.connection.disconnect()
    }
  }
}
