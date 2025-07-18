<template>
  <div v-if="contests.length > 0">
    <p class="mt-4 mb-1 font-weight-medium">
      <v-icon color="primary" left class="vertical-align-top">
        {{ mdiTrophy }}
      </v-icon>
      {{ $t('components.user.upcomingContests') }}
    </p>
    <v-sheet class="rounded">
      <v-list rounded>
        <contest-item-list
          v-for="(contest, contestIndex) in contests"
          :key="`contest-index-${contestIndex}`"
          :contest="contest"
          :with-token="contest.participant_token"
        />
      </v-list>
    </v-sheet>
  </div>
</template>

<script>
import { mdiTrophy } from '@mdi/js'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import Contest from '~/models/Contest'
import ContestItemList from '~/components/contests/ContestItemList.vue'

export default {
  name: 'MyUpcomingContests',
  components: { ContestItemList },

  data () {
    return {
      contests: [],

      mdiTrophy
    }
  },

  mounted () {
    this.getContests()
  },

  methods: {
    getContests () {
      new CurrentUserApi(this.$axios, this.$auth)
        .upcomingContests()
        .then((resp) => {
          this.contests = []
          for (const contest of resp.data) {
            this.contests.push(new Contest({ attributes: contest }))
          }
        })
    }
  }
}
</script>
