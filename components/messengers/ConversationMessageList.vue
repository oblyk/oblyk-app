<template>
  <div>
    <div
      v-for="(message, index) in messages"
      :key="message.id"
    >
      <conversation-message-item-list
        :previous-message="index !== 0 ? messageObject(conversationMessages[index - 1]) : null"
        :conversation-message="messageObject(message)"
      />
    </div>
  </div>
</template>

<script>
import ConversationMessageItemList from '@/components/messengers/ConversationMessageItemList'
import ConversationMessage from '@/models/ConversationMessage'

export default {
  name: 'ConversationMessageList',
  components: { ConversationMessageItemList },
  props: {
    conversationMessages: {
      type: Array,
      default: null
    }
  },

  computed: {
    messages () {
      return this.conversationMessages
    }
  },

  mounted () {
    this.$root.$on('receivedConversationMessage', (data) => {
      this.receivedConversationMessage(data)
    })
    this.$root.$emit('scrollToBottomConversation')
  },

  beforeDestroy () {
    this.$root.$off('receivedConversationMessage')
  },

  methods: {
    messageObject (message) {
      return new ConversationMessage({ attributes: message })
    },

    receivedConversationMessage (data) {
      this.messages.push(data)
      if (data.message_status === 'new_message') {
        setTimeout(() => {
          this.$root.$emit('scrollToBottomConversation')
        }, 500)
      }
    }
  }
}
</script>
