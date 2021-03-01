<template>
  <v-sheet
    :dark="!itsMyMessage()"
    class="pa-2 rounded-lg mb-2"
    :color="itsMyMessage() ? 'myMessage' : 'primary'"
    v-bind:class="itsMyMessage() ? 'ml-10' : 'mr-10'"
  >
    <p
      v-if="displayHead()"
      class="ma-0"
    >
      <small
        class="font-weight-bold"
        v-if="!itsMyMessage()"
      >
        {{ conversationMessage.user.first_name }}
      </small>
      <small
        class="font-weight-bold"
        v-if="itsMyMessage()"
      >
        {{ $t('common.me') }}
      </small>
    </p>
    <markdown-text :text="conversationMessage.body" />
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
  mixins: [SessionConcern, DateHelpers],
  components: { MarkdownText },
  props: {
    previousMessage: Object,
    conversationMessage: Object
  },

  methods: {
    displayHead: function () {
      if (this.previousMessage === null) return true
      return this.previousMessage.user.uuid !== this.conversationMessage.user.uuid
    },

    itsMyMessage: function () {
      return this.loggedInUser.uuid === this.conversationMessage.user.uuid
    }
  }
}
</script>
