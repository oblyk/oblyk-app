import Conversation from '@/models/Conversation'

export const ConversationConcern = {
  data () {
    return {
      conversation: null,
      loadingConversation: true
    }
  },

  created () {
    if (this.$route.params.conversationId) { this.getConversation() }
  },

  methods: {
    getConversation () {
      this.loadingConversation = true
      new Conversation({ axios: this.$axios, store: this.$store })
        ._find(this.$route.params.conversationId)
        .then((resp) => {
          this.conversation = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'conversation')
        })
        .finally(() => {
          this.loadingConversation = false
        })
    }
  }
}
