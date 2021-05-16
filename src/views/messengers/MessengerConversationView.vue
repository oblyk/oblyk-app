<template>
  <div class="full-height">
    <spinner v-if="loadingConversation"/>
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
          ref="conversationMessageList"
        >
          <loading-more
            v-if="!initialLoad"
            :get-function="getMessages"
          />
          <conversation-message-list
            v-if="!initialLoad"
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
          <conversation-message-form :conversation="conversation"/>
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
import ConversationApi from '@/services/oblyk-api/ConversationApi'
import ConversationMessageList from '@/components/messengers/ConversationMessageList'
import LoadingMore from '@/components/layouts/LoadingMore'
import { DateHelpers } from '@/mixins/DateHelpers'
import { ConversationChannel } from '@/channels/ConversationChannel'

export default {
  name: 'MessengerConversationView',
  components: {
    LoadingMore,
    ConversationMessageList,
    ConversationMessageForm,
    Spinner
  },
  mixins: [
    ConversationConcern,
    ConversationChannel,
    SessionConcern,
    DateHelpers
  ],
  props: {
    user: Object
  },

  computed: {
    conversationTitle: function () {
      if (this.conversation) {
        return this.$t('meta.messenger.conversation', { name: this.conversation.title(this.loggedInUser.uuid) })
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.conversationTitle
    }
  },

  data () {
    return {
      initialLoad: true,
      conversationMessages: [],
      loadingConversationMessages: true,
      isMobile: false,
      previousScrollHeightMinusScrollTop: 0
    }
  },

  mounted () {
    this.$root.$on('scrollToBottomConversation', () => {
      this.scrollToBottom()
    })
    this.getMessages()
    this.onResize()
    this.cableConversationSubscribe()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    this.cableConversationUnsubscribe()
    ConversationApi.read(this.conversation.id)
    this.$root.$off('scrollToBottomConversation')
  },

  methods: {
    cableConversationSubscribe: function () {
      this.$cable.subscribe(
        {
          channel: 'ConversationChannel',
          conversation_id: this.$route.params.conversationId
        }
      )
    },

    cableConversationUnsubscribe: function () {
      this.$cable.unsubscribe('ConversationChannel')
    },

    getMessages: function (page = 1) {
      if (!this.initialLoad) this.recordScrollPosition()
      this.loadingConversationMessages = true
      ConversationMessageApi
        .all(
          this.$route.params.conversationId,
          page
        )
        .then(resp => {
          if (resp.data.length < 25) this.$root.$emit('nothingMoreToLoad')
          this.conversationMessages.unshift(...resp.data)
        })
        .catch(() => {
          this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingConversationMessages = false
          this.initialLoad = false
          if (!this.initialLoad) this.restoreScrollPosition()
          this.$root.$emit('moreIsLoaded')
        })
    },

    showConversationList: function () {
      this.$root.$emit('showMessengerConversationList')
    },

    onResize: function () {
      this.isMobile = window.innerWidth < 960
    },

    scrollToBottom: function () {
      const list = this.$refs.conversationMessageList
      list.scrollTo(0, list.scrollHeight)
    },

    recordScrollPosition: function () {
      const list = this.$refs.conversationMessageList
      if (typeof list === 'undefined') return
      this.previousScrollHeightMinusScrollTop = list.scrollHeight - list.scrollTop
    },

    restoreScrollPosition: function () {
      const list = this.$refs.conversationMessageList
      if (typeof list === 'undefined') return
      list.scrollTop = list.scrollHeight - this.previousScrollHeightMinusScrollTop - 60
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
    min-height: 125px;
    flex: 0;
    padding: 0 8px 0 8px;
  }
}
</style>
