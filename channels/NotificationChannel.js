export const NotificationChannel = {
  channels: {
    NotificationChannel: {
      connected () { },
      received (data) {
        this.$root.$emit('HaveNewUnreadNotification', data)
      },
      disconnected () { }
    }
  }
}
