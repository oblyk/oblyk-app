<template>
  <div>
    <div class="text-center">
      <v-avatar
        class="hoverable"
        @click="click(user)"
      >
        <v-img
          :src="user.thumbnailAvatarUrl"
          :alt="`avatar ${user.first_name}`"
        />
      </v-avatar>
      <h3>
        <span
          class="hoverable"
          @click="click(user)"
        >
          {{ user.first_name }}
        </span>
      </h3>
      <p style="font-size: 1.2em">
        <strong :class="`${color[rank]}--text`">
          {{ $tc('components.gymRanking.rankNumber', rank, { number: rank }) }}
        </strong> ·
        <strong>{{ points }}</strong>
        <small class="vertical-align-top">pts</small>
      </p>
    </div>
    <v-sheet
      class="rounded text-center pa-4 d-flex"
      :style="`height: ${height[rank]}px`"
    >
      <div class="align-self-end text-center full-width">
        <v-icon :color="color[rank]" x-large>
          {{ mdiTrophy }}
        </v-icon>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { mdiTrophy } from '@mdi/js'

export default {
  name: 'GymRankingPodium',
  props: {
    user: {
      type: Object,
      required: true
    },

    points: {
      type: Number,
      required: true
    },

    rank: {
      type: Number,
      required: true
    },

    click: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      height: [null, 150, 100, 70],
      color: [null, 'amber', 'blue-grey', 'brown'],

      mdiTrophy
    }
  }
}
</script>
