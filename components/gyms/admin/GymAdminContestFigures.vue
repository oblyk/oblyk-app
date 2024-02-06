<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiTrophy }}
      </v-icon>
      {{ $t('components.gymAdmin.contests') }} & {{ $t('components.gymAdmin.championships') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7 d-flex justify-space-around">
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.contests_count !== null ? figures.contests_count : '...' }}
        </p>
        <small>
          {{ $t('components.gymAdmin.contests') }}
        </small>
      </div>
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.championships_count !== null ? figures.championships_count : '...' }}
        </p>
        <small>
          {{ $t('components.gymAdmin.championships') }}
        </small>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="!contestOptionAuthorised"
        elevation="0"
        text
        outlined
        :to="`${gym.adminPath}/championships`"
      >
        <v-icon
          v-if="!contestOptionAuthorised"
          left
        >
          {{ mdiLock }}
        </v-icon>
        {{ $t('components.gymAdmin.championships') }}
      </v-btn>
      <v-btn
        :disabled="!contestOptionAuthorised"
        elevation="0"
        color="primary"
        :to="`${gym.adminPath}/contests`"
      >
        <v-icon
          v-if="!contestOptionAuthorised"
          left
        >
          {{ mdiLock }}
        </v-icon>
        {{ $t('components.gymAdmin.contests') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiTrophy, mdiLock } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'

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
      figures: {},

      mdiTrophy,
      mdiLock
    }
  },

  computed: {
    contestOptionAuthorised () {
      return this.gym.gym_options.find((option) => { return option.option_type === 'contest' && option.usable })
    }
  },

  created () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['contests_count', 'championships_count'])
        .then((resp) => { this.figures = resp.data })
    }
  }
}
</script>
