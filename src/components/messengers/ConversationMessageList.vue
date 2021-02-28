<template>
  <div>
    <div
      v-for="(message, index) in conversationMessages"
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
    conversationMessages: Array
  },

  methods: {
    messageObject: function (message) {
      return new ConversationMessage(message)
    }
  }
}
</script>
