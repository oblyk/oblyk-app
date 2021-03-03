export const ConversationChannel = {
  channels: {
    ConversationChannel: {
      connected () { },
      rejected () {},
      received (data) {
        this.$root.$emit('receivedConversationMessage', data)
      },
      disconnected () {}
    }
  }
}
