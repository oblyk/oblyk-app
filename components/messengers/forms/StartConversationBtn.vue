<template>
  <v-btn
    text
    outlined
    :block="block"
    :loading="loadingStartConversation"
    color="primary"
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
import ConversationApi from '~/services/oblyk-api/ConversationApi'

export default {
  name: 'StartConversationBtn',
  props: {
    user: {
      type: Object,
      required: true
    },
    block: {
      type: Boolean,
      required: false
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
            user_id: this.$auth.user.id
          }
        ]
      }
      new ConversationApi(this.$axios, this.$auth)
        .create(data)
        .then((resp) => {
          this.$router.push(
            `/home/messenger/${resp.data.id}`
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
