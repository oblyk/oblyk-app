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
        {{ routesCount }}
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        outlined
        color="primary"
        :to="`${gym.adminPath}/routes/tables`"
      >
        <v-icon left>
          {{ mdiTable }}
        </v-icon>
        {{ $t('components.gymAdmin.gestionSettings') }}
      </v-btn>
      <v-btn
        text
        outlined
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
      routesCount: '...',

      mdiSourceBranch,
      mdiTable,
      mdiChartBar
    }
  },

  mounted () {
    this.getRoutesCount()
  },

  methods: {
    getRoutesCount () {
      new GymApi(this.$axios, this.$auth)
        .routesCount(this.gym.id)
        .then((resp) => {
          this.routesCount = resp.data
        })
    }
  }
}
</script>
