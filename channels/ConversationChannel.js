export const ConversationChannel = {
  channels: {
    ConversationChannel: {
      connected () { },
      received (data) {
        this.$root.$emit('receivedConversationMessage', data)
      },
      disconnected () { }
    }
  }
}
