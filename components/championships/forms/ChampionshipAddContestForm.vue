<template>
  <div>
    <v-skeleton-loader
      v-if="loadingContests"
      type="list-item-avatar"
    />
    <div v-else>
      <div
        v-for="(contest, contestIndex) in contests"
        :key="`contest-index-${contestIndex}`"
      >
        <p
          v-if="contestIndex === 0 || contests[contestIndex - 1].gym.name !== contest.gym.name"
          class="pl-5 font-weight-bold mb-0 border-bottom mt-5"
        >
          {{ contest.gym.name }}
        </p>
        <contest-item-list
          :contest="contest"
          :callback="addContest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import Contest from '~/models/Contest'
import ContestItemList from '~/components/contests/ContestItemList'
import ChampionshipContestApi from '~/services/oblyk-api/ChampionshipContestApi'

export default {
  name: 'ChampionshipAddContestForm',
  components: { ContestItemList },
  props: {
    gym: {
      type: Object,
      required: true
    },

    championship: {
      type: Object,
      required: true
    },

    getContests: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      loadingContests: true,
      contests: []
    }
  },

  methods: {
    getAvailableContests () {
      this.loadingContests = true
      new ChampionshipApi(this.$axios, this.$auth)
        .availableContests(this.gym.id, this.championship.id)
        .then((resp) => {
          this.contests = []
          for (const contest of resp.data) {
            this.contests.push(new Contest({ attributes: contest }))
          }
        })
        .finally(() => {
          this.loadingContests = false
        })
    },

    addContest (contest) {
      this.loadingContests = true
      new ChampionshipContestApi(this.$axios, this.$auth)
        .create(
          this.championship.gym_id,
          this.championship.id,
          contest.id
        )
        .then(() => {
          this.getContests()
        })
    }
  }
}
</script>
