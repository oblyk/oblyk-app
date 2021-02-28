<template>
  <v-list
    class="conversation-list"
    two-line
  >
    <div
      v-for="(conversation, index) in conversations"
      :key="index"
    >
      <conversation-item-list
        :conversation="conversationObject(conversation)"
      />
    </div>
  </v-list>
</template>

<script>
import ConversationItemList from '@/components/messengers/ConversationItemList'
import Conversation from '@/models/Conversation'

export default {
  name: 'ConversationList',
  components: { ConversationItemList },
  props: {
    conversations: Array
  },

  methods: {
    conversationObject: function (conversation) {
      return new Conversation(conversation)
    }
  }
}
</script>

<style lang="scss" scoped>
.conversation-list {
  height: 100%;
  padding-top: 0;
  margin-left: 10px;
  border-radius: 5px;
}
</style>
