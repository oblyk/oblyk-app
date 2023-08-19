<template>
  <v-card
    :link="presentation"
    :to="presentation ? word.path : null"
    :flat="flat"
  >
    <v-card-title
      :class="small ? 'pb-0' : ''"
    >
      {{ word.name }}
    </v-card-title>
    <v-card-text
      :class="small ? 'pb-0' : ''"
    >
      <markdown-text
        v-if="word.definition"
        :text="word.definition"
      />
    </v-card-text>
    <v-card-text v-if="!presentation">
      <contributions-label
        :versions-count="word.versions_count"
        :version-id="word.id"
        version-type="word"
      />
    </v-card-text>
    <client-only>
      <v-card-actions
        v-if="!presentation && $auth.loggedIn"
      >
        <v-spacer />
        <v-btn
          :to="`${word.path}/edit`"
          right
          text
          color="primary"
        >
          {{ $t('actions.edit') }}
        </v-btn>
      </v-card-actions>
    </client-only>
  </v-card>
</template>
<script>
import ContributionsLabel from '@/components/globals/ContributionsLable'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'WordCard',
  components: { MarkdownText, ContributionsLabel },
  props: {
    word: {
      type: Object,
      required: true
    },
    presentation: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
