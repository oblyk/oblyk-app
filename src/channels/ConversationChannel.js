export const ConversationChannel = {
  channels: {
    ConversationChannel: {
      connected () {
        console.log('Subscribe to ConversationChannel')
      },
      rejected () {},
      received (data) {
        this.$root.$emit('receivedConversationMessage', data)
      },
      disconnected () {
        console.log('Unsubscribe from ConversationChannel')
      }
    }
  }
}
