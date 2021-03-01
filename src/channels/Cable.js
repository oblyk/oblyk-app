import { SessionConcern } from '@/concerns/SessionConcern'

export const Cable = {
  mixins: [SessionConcern],
  methods: {
    connectCable: function () {
      if (this.isLoggedIn) {
        this.$cable.connection.connect(`ws://localhost:3000/cable?token=${this.getToken}`)
      }
    },

    disconnectCable () {
      this.$cable.connection.disconnect()
    }
  }
}
