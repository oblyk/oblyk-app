<template>
  <v-sheet class="rounded">
    <p class="font-weight-bold mb-0 mt-1">
      <v-icon
        left
        color="amber"
      >
        {{ mdiTrophy }}
      </v-icon>
      {{ $tc('components.gym.upcomingContests', gym.upcoming_contests.length, { count: gym.upcoming_contests.length }) }}
    </p>
    <v-list>
      <contest-item-list
        v-for="(contest, contestIndex) in gym.upcoming_contests"
        :key="`contest-index-${contestIndex}`"
        :contest="contestToObject(contest)"
        class="rounded-sm border"
      />
    </v-list>
  </v-sheet>
</template>
<script>
import { mdiTrophy } from '@mdi/js'
import ContestItemList from '~/components/contests/ContestItemList.vue'
import Contest from '~/models/Contest'

export default {
  name: 'ContestUpComing',
  components: { ContestItemList },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTrophy
    }
  },

  methods: {
    contestToObject (contest) {
      return new Contest({ attributes: contest })
    }
  }
}
</script>
