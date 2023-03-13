<template>
  <v-sheet
    v-if="gym.sorts_available.difficulty_by_point"
    class="pa-2 rounded text-right"
    :class="additionalClass"
  >
    <v-btn
      text
      outlined
      color="primary"
      :to="`${gym.path}/ranking`"
    >
      <v-icon left>
        {{ mdiTrophy }}
      </v-icon>
      {{ $t('components.gymRanking.rank') }}
    </v-btn>
  </v-sheet>
</template>

<script>
import { mdiTrophy } from '@mdi/js'

export default {
  name: 'GymGoToRanking',
  props: {
    gym: {
      type: Object,
      required: true
    },
    additionalClass: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      mdiTrophy
    }
  }
}
</script>
