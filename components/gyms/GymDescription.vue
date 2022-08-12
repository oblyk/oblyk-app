<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiText }}
      </v-icon>
      Description
    </v-card-title>
    <v-card-text>
      <markdown-text
        v-if="gym.description"
        :text="gym.description"
      />
    </v-card-text>
    <v-card-text>
      <v-chip
        v-for="climb in gym.climbingTypes"
        :key="climb"
        class="ma-1"
      >
        {{ $t(`models.climbs.${climb}`) }}
      </v-chip>
    </v-card-text>
    <v-card-text
      v-if="!gym.administered"
      class="text-center"
    >
      <v-btn
        outlined
        :to="`/a${gym.path}/administration-request`"
        color="primary"
      >
        {{ $t('components.gym.IAmManager') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiText } from '@mdi/js'

const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymDescription',
  components: { MarkdownText },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiText
    }
  }
}
</script>
