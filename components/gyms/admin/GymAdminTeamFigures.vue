<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ mdiAccountGroup }}
      </v-icon>
      {{ $t('components.gymAdmin.team') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ figures.gym_administrators_count || '...' }}
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        outlined
        :to="`${gym.adminPath}/administrators`"
      >
        {{ $t('components.gymAdmin.team') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiAccountGroup } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'GymAdminTeamFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},

      mdiAccountGroup
    }
  },

  created () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['gym_administrators_count'])
        .then((resp) => { this.figures = resp.data })
    }
  }
}
</script>
