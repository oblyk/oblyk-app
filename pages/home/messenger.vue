<template>
  <div>
    <page-header
      :title="$t('components.layout.appBar.user.messenger')"
      back-to="/home"
    />

    <v-row class="messenger-layout">
      <!-- Conversation list -->
      <v-col
        v-show="conversationList"
        class="col-12 col-md-4 col-lg-3 pr-0 pr-md-3 conversations-col"
      >
        <div v-if="loadingConversations" class="pl-4">
          <v-skeleton-loader
            v-for="index in 3"
            :key="`conversation-${index}`"
            class="mt-3"
            type="list-item-avatar-two-line"
          />
        </div>
        <conversation-list
          v-else
          :user="currentUser"
          :conversations="conversations"
        />
      </v-col>

      <!-- Message list -->
      <v-col
        v-show="messageList"
        class="col-12 col-md-8 col-lg-9 pr-0 pr-md-6 pl-6 pl-md-3 full-height"
      >
        <nuxt-child :key="$route.fullPath" :user="currentUser" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import ConversationList from '~/components/messengers/ConversationsList.vue'
import ConversationApi from '~/services/oblyk-api/ConversationApi'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  components: { PageHeader, ConversationList },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      loadingConversations: true,
      conversations: [],
      isMobile: false,
      conversationList: true,
      messageList: true,

      mdiArrowLeft
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma messagerie'
      },
      en: {
        metaTitle: 'My messenger'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
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
    getConversations () {
      this.loadingConversations = true
      new ConversationApi(this.$axios, this.$auth)
        .all()
        .then((resp) => {
          this.conversations = resp.data
        })
        .finally(() => {
          this.loadingConversations = false
        })
    },

    onResize () {
      // do not resize if is already a phone
      if ((window.innerWidth < 960) === this.isMobile) { return false }

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

    showConversationList () {
      if (this.isMobile) {
        this.conversationList = true
        this.messageList = false
      } else {
        this.conversationList = true
        this.messageList = true
      }
    },

    showMessageList () {
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
  margin-top: -3px;
  max-width: 100vw;
  height: calc(100vh - 125px);
}
@media only screen and (max-width: 600px) {
  .messenger-layout {
    height: calc(100vh - 117px);
  }
}
</style>
