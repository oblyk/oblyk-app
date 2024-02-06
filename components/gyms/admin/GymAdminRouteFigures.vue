<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ mdiSourceBranch }}
      </v-icon>
      {{ $t('components.gymAdmin.routes') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ figures.mounted_gym_routes_count !== null ? figures.mounted_gym_routes_count : '...' }}
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-btn
        elevation="0"
        color="primary"
        class="ml-auto"
        :to="`${gym.adminPath}/routes/tables`"
      >
        <v-icon left>
          {{ mdiTable }}
        </v-icon>
        {{ $t('components.gymAdmin.table') }}
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        :to="`${gym.adminPath}/routes/statistics`"
      >
        <v-icon left>
          {{ mdiChartBar }}
        </v-icon>
        {{ $t('components.gymAdmin.statistic') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiSourceBranch, mdiTable, mdiChartBar } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'GymAdminRouteFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},

      mdiSourceBranch,
      mdiTable,
      mdiChartBar
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['mounted_gym_routes_count'])
        .then((resp) => { this.figures = resp.data })
    }
  }
}
</script>
