<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiTrophy }}
      </v-icon>
      {{ $t('components.gymAdmin.contests') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        <span v-if="loadingContests">
          ...
        </span>
        <span v-else>
          {{ contests.length }}
        </span>
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        elevation="0"
        color="primary"
        :to="`${gym.adminPath}/contests`"
      >
        {{ $t('components.gymAdmin.contests') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiTrophy } from '@mdi/js'
import ContestApi from '~/services/oblyk-api/ContestApi'
import Contest from '~/models/Contest'

export default {
  name: 'GymAdminContestsFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingContests: true,
      contests: [],

      mdiTrophy
    }
  },

  created () {
    this.getContests()
  },

  methods: {
    getContests () {
      new ContestApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          for (const contest of resp.data) {
            this.contests.push(new Contest({ attributes: contest }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.loadingContests = false
        })
    }
  }
}
</script>
