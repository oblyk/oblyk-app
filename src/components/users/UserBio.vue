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

      <!-- Activity -->
      <p class="text-right mb-0 pb-0 last-activity-label">
        <small>
          {{ $t('date.lastActivity', { date: dateFromNow(user.last_activity_at) }) }}
        </small>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import MarkdownText from '@/components/ui/MarkdownText'

export default {
  name: 'UserBio',
  components: { MarkdownText },
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
