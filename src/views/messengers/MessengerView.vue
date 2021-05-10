<template>
  <div>
    <spinner v-if="loadingCurrentUser" />
    <v-row
      v-if="!loadingCurrentUser"
      class="messenger-layout"
    >

      <!-- Conversation list -->
      <v-col
        v-show="conversationList"
        class="col-12 col-md-4 col-lg-3 pr-6 pr-md-0 conversations-col"
      >
        <spinner v-if="loadingConversations" />
        <conversation-list
          v-if="!loadingConversations"
          :conversations="conversations"
        />
      </v-col>

      <!-- Message list -->
      <v-col
        v-show="messageList"
        class="col-12 col-md-8 col-lg-9 pr-6 pl-6 pl-md-3 full-height"
      >
        <router-view :key="$route.fullPath" :user="currentUser" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import ConversationList from '@/components/messengers/ConversationsList'
import ConversationApi from '@/services/oblyk-api/ConversationApi'

export default {
  name: 'MessengerView',
  components: { ConversationList, Spinner },
  mixins: [CurrentUserConcern],

  metaInfo () {
    return {
      title: this.$t('meta.messenger.list')
    }
  },

  data () {
    return {
      loadingConversations: true,
      conversations: [],
      isMobile: false,
      conversationList: true,
      messageList: true
    }
  },

  mounted () {
    this.getConversations()
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })

    this.$root.$on('showMessengerConversationList', () => {
      this.showConversationList()
    })

    this.$root.$on('showMessengerMessageList', () => {
      this.showMessageList()
    })
  },

  beforeDestroy () {
    this.$root.$off('showMessengerConversationList')
    this.$root.$off('showMessengerMessageList')
  },

  methods: {
    getConversations: function () {
      this.loadingConversations = true
      ConversationApi
        .all()
        .then(resp => {
          this.conversations = resp.data
        })
        .finally(() => {
          this.loadingConversations = false
        })
    },

    onResize: function () {
      if (window.innerWidth < 960) {
        this.isMobile = true
        this.conversationList = true
        this.messageList = false
      } else {
        this.isMobile = false
        this.conversationList = true
        this.messageList = true
      }
    },

    showConversationList: function () {
      if (this.isMobile) {
        this.conversationList = true
        this.messageList = false
      } else {
        this.conversationList = true
        this.messageList = true
      }
    },

    showMessageList: function () {
      if (this.isMobile) {
        this.conversationList = false
        this.messageList = true
      } else {
        this.conversationList = true
        this.messageList = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.conversations-col {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.messenger-layout {
  height: calc(100vh - 64px);
}
@media only screen and (max-width: 600px) {
  .messenger-layout {
    height: calc(100vh - 48px);
  }
}
</style>
