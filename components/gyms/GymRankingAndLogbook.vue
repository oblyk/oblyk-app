<template>
  <div
    v-if="$auth.loggedIn || gym.sorts_available.difficulty_by_point"
    class="d-flex justify-end"
  >
    <div
      v-if="$auth.loggedIn"
      class="mr-1 w-50"
    >
      <v-btn
        text
        block
        class="pa-4"
        :small="$vuetify.breakpoint.mobile"
        outlined
        to="/home/ascents/indoor"
      >
        <v-icon left>
          {{ mdiChartBoxOutline }}
        </v-icon>
        {{ $t('components.user.cardsTitle.myLogbook') }}
      </v-btn>
    </div>
    <div
      v-if="gym.display_ranking"
      class="ml-1 w-50"
    >
      <v-btn
        text
        block
        class="pa-4"
        :small="$vuetify.breakpoint.mobile"
        outlined
        :to="`${gym.path}/ranking`"
      >
        <v-icon left>
          {{ mdiTrophy }}
        </v-icon>
        {{ $t('components.gymRanking.rank') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiTrophy, mdiChartBoxOutline } from '@mdi/js'

export default {
  name: 'GymRankingAndLogbook',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTrophy,
      mdiChartBoxOutline
    }
  }
}
</script>
