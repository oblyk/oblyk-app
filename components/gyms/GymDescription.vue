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
      <v-badge
        content="beta"
        color="blue"
        overlap
      >
        <template #badge>
          <v-icon
            left
            class="mr-1"
          >
            {{ mdiFlask }}
          </v-icon>
          Beta
        </template>
        <v-btn
          outlined
          :to="`${gym.path}/administration-request`"
          color="primary"
        >
          {{ $t('components.gym.IAmManager') }}
        </v-btn>
      </v-badge>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiText, mdiFlask } from '@mdi/js'

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
      mdiText,
      mdiFlask
    }
  }
}
</script>
