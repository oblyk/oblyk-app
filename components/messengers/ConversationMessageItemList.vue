<template>
  <v-sheet
    :dark="!itsMyMessage()"
    class="pa-2 rounded-lg mb-2 conversation-message"
    :class="itsMyMessage() ? 'ml-10 my-message' : 'mr-10 other-message'"
  >
    <p
      v-if="displayHead()"
      class="ma-0"
    >
      <small
        v-if="!itsMyMessage()"
        class="font-weight-bold"
      >
        {{ conversationMessage.user.first_name }}
      </small>
      <small
        v-if="itsMyMessage()"
        class="font-weight-bold"
      >
        {{ $t('common.me') }}
      </small>
    </p>
    <markdown-text
      v-if="conversationMessage.body"
      :text="conversationMessage.body"
    />
    <p class="ma-0 text-right">
      <small
        :title="humanizeDate(conversationMessage.posted_at, 'LLL')"
      >
        {{ humanizeDateDuration(conversationMessage.posted_at) }}
      </small>
    </p>
  </v-sheet>
</template>

<script>
import MarkdownText from '@/components/ui/MarkdownText'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'ConversationMessageItemList',
  components: { MarkdownText },
  mixins: [SessionConcern, DateHelpers],
  props: {
    previousMessage: {
      type: Object,
      default: null
    },
    conversationMessage: {
      type: Object,
      default: null
    }
  },

  methods: {
    displayHead () {
      if (this.previousMessage === null) { return true }
      return this.previousMessage.user.uuid !== this.conversationMessage.user.uuid
    },

    itsMyMessage () {
      return this.loggedInUser.uuid === this.conversationMessage.user.uuid
    }
  }
}
</script>
