<template>
  <v-form @submit.prevent="submit()">
    <v-row>
      <v-col
        class="pb-0"
      >
        <markdown-input
          v-model="data.body"
          :rows="1"
          :hide-detail="true"
          :auto-grow="true"
          :label="$t('models.conversationMessage.body')"
        />
      </v-col>
      <v-col class="submit-message-col pl-0 pb-0">
        <v-btn
          @click="submit()"
          class="mt-1"
          large
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
import ConversationMessage from '@/models/ConversationMessage'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'ConversationMessageForm',
  components: { MarkdownInput },
  mixins: [FormHelpers],
  props: {
    conversationMessage: Object,
    conversation: Object
  },

  data () {
    return {
      data: {
        id: (this.conversationMessage || {}).id,
        conversation_id: (this.conversationMessage || {}).conversation_id || this.conversation.id,
        body: (this.conversationMessage || {}).body
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? ConversationMessageApi.update(this.data) : ConversationMessageApi.create(this.data)

      promise
        .then(resp => {
          const conversationMessage = new ConversationMessage(resp.data)
          console.log(conversationMessage)
          this.data.body = null
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'conversationMessage')
        })
        .then(() => {
          this.submitOverlay = false
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
