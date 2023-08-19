<template>
  <v-sheet
    :dark="!itsMyMessage()"
    class="pa-2 rounded mb-2 conversation-message"
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
        {{ conversationMessage.creator.first_name }}
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
        :title="humanizeDate(conversationMessage.posted_at, 'DATETIME_FULL')"
      >
        {{ dateFromNow(conversationMessage.posted_at) }}
      </small>
    </p>
  </v-sheet>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'ConversationMessageItemList',
  components: { MarkdownText },
  mixins: [DateHelpers],
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
      return this.previousMessage.creator.uuid !== this.conversationMessage.creator.uuid
    },

    itsMyMessage () {
      return this.$auth.user.uuid === this.conversationMessage.creator.uuid
    }
  }
}
</script>
