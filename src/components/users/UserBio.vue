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
      <markdown-text :text="user.description" />

      <!-- Bio empty -->
      <p
        class="text-center text--disabled mt-7 mb-7"
        v-if="!user.description"
      >
        {{ $t('components.user.bioIsEmpty', { name: user.first_name} ) }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <start-conversation-btn :user="user" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import MarkdownText from '@/components/ui/MarkdownText'
import StartConversationBtn from '@/components/messengers/forms/StartConversationBtn'

export default {
  name: 'UserBio',
  components: { StartConversationBtn, MarkdownText },
  mixins: [DateHelpers],
  props: {
    user: Object
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
