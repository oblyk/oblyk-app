<template>
  <div v-if="contests.length > 0">
    <h3 class="mb-2">
      <v-icon
        class="mr-2 mb-2"
        color="amber"
      >
        {{ mdiTrophy }}
      </v-icon>
      {{ $t('components.user.upcomingContests') }}
    </h3>
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
