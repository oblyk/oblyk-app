<template>
  <div class="full-height">
    <!-- Loading conversation -->
    <div v-if="loadingConversation">
      <v-sheet class="mr-10 mt-4 pa-3">
        <v-skeleton-loader type="paragraph" />
      </v-sheet>
      <v-sheet class="ml-10 mt-4 pa-3">
        <v-skeleton-loader type="paragraph" />
      </v-sheet>
      <v-sheet class="mr-10 mt-4 pa-3">
        <v-skeleton-loader type="paragraph" />
      </v-sheet>
    </div>

    <!-- Messenger layout -->
    <v-sheet
      v-else
      class="full-height rounded"
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
            <v-icon>{{ mdiArrowLeft }}</v-icon>
          </v-btn>
          {{ conversationTitle }}
        </h4>
      </div>

      <!-- Message list and post form -->
      <div
        class="message-list-and-post-form"
      >
        <!-- Message list -->
        <div
          ref="conversationMessageList"
          class="message-list"
        >
          <!-- Loading old message -->
          <div
            v-if="!noMoreOlderMessage && !initialLoad"
            class="text-center"
          >
            <v-btn
              v-if="!loadingMoreMessage"
              v-intersect="onConversationTop"
              text
            >
              {{ $t('components.loadMore.loadMore') }}
            </v-btn>
            <spinner v-if="loadingMoreMessage" :full-height="false" />
          </div>

          <!-- List of message -->
          <conversation-message-list
            v-if="!initialLoad"
            :conversation-messages="conversationMessages"
          />
          <p
            v-if="!loadingConversationMessages && conversationMessages.length === 0"
            class="text-center text--disabled"
          >
            {{ $t('components.messenger.messageEmpty', { name: conversationTitle }) }}
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
import { mdiArrowLeft } from '@mdi/js'
import { ConversationConcern } from '~/concerns/ConversationConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import ConversationMessageForm from '~/components/messengers/forms/ConversationMessageForm.vue'
import ConversationMessageApi from '~/services/oblyk-api/ConversationMessageApi'
import ConversationApi from '~/services/oblyk-api/ConversationApi'
import ConversationMessageList from '~/components/messengers/ConversationMessageList.vue'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  components: {
    ConversationMessageList,
    ConversationMessageForm,
    Spinner
  },
  mixins: [
    ConversationConcern,
    DateHelpers
  ],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiArrowLeft,
      noMoreOlderMessage: false,
      loadingMoreMessage: false,
      oldestMessageDate: null,
      initialLoad: true,
      conversationMessages: [],
      loadingConversationMessages: true,
      isMobile: false,
      previousScrollHeightMinusScrollTop: 0
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Conversation avec %{name}'
      },
      en: {
        metaTitle: 'Conversation with %{name}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.conversationTitle })
    }
  },

  computed: {
    conversationTitle () {
      const title = []
      for (const user of (this.conversation || {}).conversation_users || []) {
        if (this.$auth.user.uuid !== user.uuid) {
          title.push(user.first_name)
        }
      }
      return title.join(', ')
    }
  },

  watch: {
    conversationMessages () {
      const messageCount = this.conversationMessages.length
      if (messageCount > 0) {
        this.oldestMessageDate = this.conversationMessages[0].posted_at
      }
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
    new ConversationApi(this.$axios, this.$auth).read(this.conversation.id)
    this.$root.$off('scrollToBottomConversation')
  },

  methods: {
    cableConversationSubscribe () {
      this.$cable.subscribe(
        {
          channel: 'ConversationChannel',
          conversation_id: this.$route.params.conversationId
        }
      )
    },

    cableConversationUnsubscribe () {
      this.$cable.unsubscribe('ConversationChannel')
    },

    getMessages () {
      if (!this.initialLoad) { this.recordScrollPosition() }
      this.loadingConversationMessages = true
      new ConversationMessageApi(this.$axios, this.$auth)
        .all(
          this.$route.params.conversationId,
          this.oldestMessageDate
        )
        .then((resp) => {
          this.$root.$emit('showMessengerMessageList')
          if (resp.data.length < 25) { this.noMoreOlderMessage = true }
          this.conversationMessages.unshift(...resp.data)
        })
        .catch(() => {
          this.noMoreOlderMessage = true
        })
        .finally(() => {
          this.loadingConversationMessages = false
          this.initialLoad = false
          if (!this.initialLoad) { this.restoreScrollPosition() }
          this.loadingMoreMessage = false
        })
    },

    showConversationList () {
      this.$root.$emit('showMessengerConversationList')
    },

    onResize () {
      this.isMobile = window.innerWidth < 960
    },

    scrollToBottom () {
      const list = this.$refs.conversationMessageList
      list.scrollTo(0, list.scrollHeight)
    },

    recordScrollPosition () {
      const list = this.$refs.conversationMessageList
      if (typeof list === 'undefined') { return }
      this.previousScrollHeightMinusScrollTop = list.scrollHeight - list.scrollTop
    },

    restoreScrollPosition () {
      const list = this.$refs.conversationMessageList
      if (typeof list === 'undefined') { return }
      list.scrollTop = list.scrollHeight - this.previousScrollHeightMinusScrollTop - 60
    },

    onConversationTop (entries, observer) {
      if (
        entries[0].isIntersecting &&
        !this.noMoreOlderMessage &&
        !this.loadingMoreMessage
      ) {
        this.loadMoreOlderMessage()
      }
    },

    loadMoreOlderMessage () {
      this.loadingMoreMessage = true
      this.getMessages()
    }
  }
}
</script>

<style lang="scss">
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

.theme--dark {
  .conversation-message {
    &.my-message { background-color: #121212; }
    &.other-message { background-color: #01579b; }
  }
}

.theme--light {
  .conversation-message {
    &.my-message {background-color: #f5f5f5; }
    &.other-message {background-color: #01579b; }
  }
}
</style>
