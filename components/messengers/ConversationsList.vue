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
        :to="`${user.currentUserPath}/messenger/new`"
        :title="$t('actions.newConversation')"
        dark
        elevation="0"
        @click="showMessengerMessageList()"
      >
        <v-icon>
          {{ mdiPencil }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiPencil } from '@mdi/js'
import ConversationItemList from '@/components/messengers/ConversationItemList'
import Conversation from '@/models/Conversation'

export default {
  name: 'ConversationList',
  components: { ConversationItemList },
  props: {
    user: {
      type: Object,
      required: true
    },
    conversations: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      mdiPencil
    }
  },

  methods: {
    conversationObject (conversation) {
      return new Conversation({ attributes: conversation })
    },

    showMessengerMessageList () {
      this.$root.$emit('showMessengerMessageList')
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
    border-radius: 15px;
    position: relative;
    overflow-y: auto;
  }
  .conversation-add-btn {
    text-align: right;
    width: 75px;
    margin-left: calc(100% - 75px);
    position: sticky;
    padding-right: 1em;
    bottom: 0;
  }
}
</style>
