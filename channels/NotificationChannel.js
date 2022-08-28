export const NotificationChannel = {
  channels: {
    NotificationChannel: {
      connected () { },
      received (data) {
        this.$store.dispatch('notification/changeNotificationStatus', data)
      },
      disconnected () { }
    }
  }
}
