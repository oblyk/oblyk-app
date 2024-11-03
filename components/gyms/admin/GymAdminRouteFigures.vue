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
      <v-menu>
        <template #activator="{ on, attrs }">
          <v-btn
            large
            icon
            class="ml-auto"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              {{ mdiDotsVertical }}
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            :to="`${gym.adminPath}/opening-sheets`"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiFileRefreshOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Fiches d'ouvertures
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  small
                  color="blue"
                  class="white--text font-weight-bold"
                >
                  <v-icon small class="mr-2">
                    {{ mdiFlask }}
                  </v-icon>
                  ÉXPÉRIMENTAL
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        elevation="0"
        color="primary"
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
import { mdiSourceBranch, mdiTable, mdiChartBar, mdiDotsVertical, mdiFileRefreshOutline, mdiFlask } from '@mdi/js'
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
      mdiChartBar,
      mdiDotsVertical,
      mdiFileRefreshOutline,
      mdiFlask
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
