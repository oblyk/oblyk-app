<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-text-account
      </v-icon>
      {{ $t('components.user.bio') }}
    </v-card-title>
    <v-card-text>
      <!-- Bio -->
      <markdown-text
        v-if="user.description"
        :text="user.description"
      />

      <!-- Bio empty -->
      <p
        v-if="!user.description"
        class="text-center text--disabled mt-7 mb-7"
      >
        {{ $t('components.user.bioIsEmpty', { name: user.first_name} ) }}
      </p>
    </v-card-text>
    <v-card-actions v-if="isLoggedIn">
      <v-spacer />
      <start-conversation-btn :user="user" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import StartConversationBtn from '@/components/messengers/forms/StartConversationBtn'
import { SessionConcern } from '@/concerns/SessionConcern'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'UserBio',
  components: { StartConversationBtn, MarkdownText },
  mixins: [DateHelpers, SessionConcern],
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.last-activity-label {
  position: absolute;
  bottom: 0;
  right: 5px;
}
</style>
