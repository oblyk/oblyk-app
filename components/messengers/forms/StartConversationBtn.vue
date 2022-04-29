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
      {{ mdiMessageReplyText }}
    </v-icon>
    {{ $t('actions.writeMessage') }}
  </v-btn>
</template>

<script>
import { mdiMessageReplyText } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import ConversationApi from '~/services/oblyk-api/ConversationApi'

export default {
  name: 'StartConversationBtn',
  mixins: [SessionConcern],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMessageReplyText,
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
            `/me/${this.$auth.user.slug_name}/messenger/${resp.data.id}`
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
