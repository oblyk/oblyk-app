<template>
  <div class="conversation-list-and-add-btn">
    <v-list
      class="conversation-list"
      two-line
    >
      <!-- Conversation list -->
      <div
        v-for="(conversation, index) in conversations"
        :key="index"
      >
        <conversation-item-list
          :conversation="conversationObject(conversation)"
        />
      </div>
    </v-list>

    <!-- New conversation -->
    <div class="conversation-add-btn">
      <v-btn
        fab
        to="/messenger/new"
        :title="$t('actions.newConversation')"
        color="primary"
      >
        <v-icon>
          mdi-comment-plus
        </v-icon>
      </v-btn>
    </div>
  </div>
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
.conversation-list-and-add-btn {
  position: relative;
  .conversation-list {
    height: 100%;
    padding-top: 0;
    margin-left: 10px;
    border-radius: 5px;
    position: relative;
    overflow-y: auto;
  }
  .conversation-add-btn {
    padding-top: 1.5em;
    text-align: right;
    width: 100%;
    position: sticky;
    padding-right: 1em;
    bottom: 0;
  }
}
</style>
