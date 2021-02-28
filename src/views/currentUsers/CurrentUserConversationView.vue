<template>
  <div class="full-height">
    <spinner v-if="loadingConversation" />
    <v-sheet
      class="full-height rounded"
      v-if="!loadingConversation"
    >

      <!-- Title -->
      <div
        class="conversation-title pa-3"
      >
        <h4>
          <v-btn
            v-if="isMobile"
            class="mr-1"
            icon
            @click="showConversationList()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          {{ conversation.title(loggedInUser.uuid) }}
        </h4>
      </div>

      <!-- Message list and post form -->
      <div
        class="message-list-and-post-form"
      >

        <!-- Message list -->
        <div
          class="message-list"
        >
          <spinner
            v-if="loadingConversationMessages"
            :full-height="false"
          />
          <conversation-message-list
            v-if="!loadingConversationMessages"
            :conversation-messages="conversationMessages"
          />
          <p
            class="text-center text--disabled"
            v-if="!loadingConversationMessages && conversationMessages.length === 0"
          >
            {{ $t('components.messenger.messageEmpty') }}
          </p>
        </div>

        <!-- Post message form -->
        <div class="post-message-form">
          <conversation-message-form :conversation="conversation" />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { ConversationConcern } from '@/concerns/ConversationConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import Spinner from '@/components/layouts/Spiner'
import ConversationMessageForm from '@/components/messengers/forms/ConversationMessageForm'
import ConversationMessageApi from '@/services/oblyk-api/ConversationMessageApi'
import ConversationMessageList from '@/components/messengers/ConversationMessageList'

export default {
  name: 'CurrentUserConversationView',
  components: { ConversationMessageList, ConversationMessageForm, Spinner },
  mixins: [ConversationConcern, SessionConcern],
  props: {
    user: Object
  },

  data () {
    return {
      conversationMessages: [],
      loadingConversationMessages: true,
      isMobile: false
    }
  },

  watch: {
    '$route.params.conversationId': 'watchConversation'
  },

  mounted () {
    this.getMessages()
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    watchConversation: function () {
      this.getMessages()
      this.getConversation()
    },

    getMessages: function () {
      this.loadingConversationMessages = true
      ConversationMessageApi
        .all(this.$route.params.conversationId)
        .then(resp => {
          this.conversationMessages = resp.data
        })
        .finally(() => {
          this.loadingConversationMessages = false
        })
    },

    showConversationList: function () {
      this.$root.$emit('showMessengerConversationList')
    },

    onResize: function () {
      this.isMobile = window.innerWidth < 960
    }
  }
}
</script>

<style lang="scss" scoped>
.conversation-title {
  height: 53px;
}
.message-list-and-post-form {
  height: calc(100% - 53px);
  max-height: calc(100% - 53px);
  display: flex;
  flex-direction: column;
  .message-list {
    flex: 2;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 8px 0 8px;
  }
  .post-message-form {
    min-height: 80px;
    flex: 0;
    padding: 0 8px 0 8px;
  }
}
</style>
