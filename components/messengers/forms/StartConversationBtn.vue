<template>
  <v-btn
    text
    small
    :loading="loadingStartConversation"
    color="teal"
    @click="startConversation()"
  >
    <v-icon
      small
      left
    >
      mdi-message-reply-text
    </v-icon>
    {{ $t('actions.writeMessage') }}
  </v-btn>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import ConversationApi from '~/services/oblyk-api/ConversationApi'

export default {
  name: 'StartConversationBtn',
  mixins: [SessionConcern],
  props: {
    user: Object
  },

  data () {
    return {
      loadingStartConversation: false
    }
  },

  methods: {
    startConversation () {
      this.loadingStartConversation = true
      const data = {
        conversation_users_attributes: [
          {
            id: null,
            user_id: this.user.id
          },
          {
            id: null,
            user_id: this.loggedInUser.id
          }
        ]
      }
      new ConversationApi(this.$axios, this.$auth)
        .create(data)
        .then((resp) => {
          this.$router.push(
            `${this.loggedInUserUserPath}/messenger/${resp.data.id}`
          )
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'conversation')
        })
        .finally(() => {
          this.loadingStartConversation = false
        })
    }
  }
}
</script>
