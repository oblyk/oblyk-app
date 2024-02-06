<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiBolt }}
      </v-icon>
      {{ $t('components.gymAdmin.openers') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ figures.gym_openers_count !== null ? figures.gym_openers_count : '...' }}
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        outlined
        :to="`${gym.adminPath}/openers`"
      >
        {{ $t('components.gymAdmin.openers') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiBolt } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'GymAdminOpenersFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},

      mdiBolt
    }
  },

  created () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['gym_openers_count'])
        .then((resp) => { this.figures = resp.data })
    }
  }
}
</script>
