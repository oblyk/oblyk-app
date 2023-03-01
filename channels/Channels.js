export const Channels = {
  channels: {
    // Listen to new notifications
    NotificationChannel: {
      connected () { },
      received (data) {
        this.$store.dispatch('notification/changeNotificationStatus', data)
      },
      disconnected () { }
    },

    // Channel for Oblyk messenger
    ConversationChannel: {
      connected () { },
      received (data) {
        this.$root.$emit('receivedConversationMessage', data)
      },
      disconnected () { }
    },

    // Channel for Re Fetch User when something change
    FetchUserChannel: {
      connected () { },
      received (data) {
        this.$auth.fetchUser()
      },
      disconnected () { }
    }
  }
}
