<template>
  <v-form @submit.prevent="submit()">
    <v-row>
      <v-col
        class="pb-0"
      >
        <v-textarea
          outlined
          v-model="data.body"
          :label="$t('models.conversationMessage.body')"
          hide-details
          :auto-grow="true"
          :rows="1"
          @keydown="onKeyDown"
          @keyup="saveDraft"
        />
      </v-col>
      <v-col class="submit-message-col pl-0 pb-0">
        <v-btn
          @click="submit()"
          class="mt-1"
          large
          :loading="messageSending"
          icon
        >
          <v-icon>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import ConversationMessageApi from '@/services/oblyk-api/ConversationMessageApi'

export default {
  name: 'ConversationMessageForm',
  mixins: [FormHelpers],
  props: {
    conversationMessage: Object,
    conversation: Object
  },

  data () {
    return {
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
      this.data.body = localStorage.getItem(this.draftStorageKey)
    }
  },

  methods: {
    onKeyDown: function (event) {
      if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
        this.submit()
        return
      }
      if (event.key === 'Enter' && event.ctrlKey) {
        this.data.body += '\n'
      }
    },

    saveDraft: function () {
      if (!this.isEditingForm()) {
        localStorage.setItem(this.draftStorageKey, this.data.body)
      }
    },

    submit: function () {
      if (this.data.body === null || this.data.body === '') return

      this.messageSending = true
      const promise = (this.isEditingForm()) ? ConversationMessageApi.update(this.data) : ConversationMessageApi.create(this.data)

      promise
        .then(() => {
          this.data.body = null
          localStorage.removeItem(this.draftStorageKey)
        })
        .catch(err => {
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
