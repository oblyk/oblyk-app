<template>
  <v-form @submit.prevent="submit()">
    <v-row>
      <v-col
        class="pb-0"
      >
        <v-textarea
          v-model="data.body"
          outlined
          :label="$t('models.conversationMessage.body')"
          hide-details
          :rows="3"
          @keydown="onKeyDown"
          @keyup="saveDraft"
        />
      </v-col>
      <v-col class="submit-message-col pl-0 pb-0 pt-9">
        <v-btn
          class="mt-1"
          large
          :loading="messageSending"
          icon
          @click="submit()"
        >
          <v-icon>
            {{ mdiSend }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mdiSend } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import ConversationMessageApi from '~/services/oblyk-api/ConversationMessageApi'

export default {
  name: 'ConversationMessageForm',
  mixins: [FormHelpers],
  props: {
    conversationMessage: {
      type: Object,
      default: null
    },
    conversation: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiSend,
      messageSending: false,
      draftStorageKey: `draftConversationMessage:${this.conversation.id}`,
      data: {
        id: (this.conversationMessage || {}).id,
        conversation_id: (this.conversationMessage || {}).conversation_id || this.conversation.id,
        body: (this.conversationMessage || {}).body
      }
    }
  },

  mounted () {
    if (!this.isEditingForm()) {
      this.data.body = localStorage.getItem(this.draftStorageKey) || ''
    }
  },

  methods: {
    onKeyDown (event) {
      if (window.innerWidth > 960) {
        if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
          this.submit()
          return false
        }
        if (event.key === 'Enter' && event.ctrlKey) {
          this.data.body += '\n'
        }
      }
    },

    saveDraft () {
      if (!this.isEditingForm()) {
        localStorage.setItem(this.draftStorageKey, this.data.body)
      }
    },

    submit () {
      if (this.data.body === null || this.data.body === '') {
        return false
      }

      this.messageSending = true
      const promise = (this.isEditingForm()) ? new ConversationMessageApi(this.$axios, this.$auth).update(this.data) : new ConversationMessageApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          this.data.body = null
          localStorage.removeItem(this.draftStorageKey)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'conversationMessage')
        })
        .then(() => {
          this.messageSending = false
        })
    }
  }
}
</script>

<style>
.submit-message-col {
  max-width: 70px;
}
</style>
