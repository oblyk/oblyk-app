<template>
  <div>
    <p class="mb-1">
      <small class="font-weight-medium">
        <v-icon color="primary" left small class="vertical-align-sub">
          {{ mdiViewDashboard }}
        </v-icon>
        {{ $t('common.environments') }}
      </small>
    </p>
    <v-card class="d-flex align-center mb-1 py-0" to="/outdoor">
      <div>
        <v-card-title>
          <v-icon color="primary" left>
            {{ mdiTerrain }}
          </v-icon>
          Outdoor
        </v-card-title>
        <v-card-subtitle class="caption">
          {{ $tc('common.figures.crags', figures?.crags_count, { count: figures?.crags_count?.toLocaleString() ?? '...' }) }} ·
          {{ $tc('common.figures.cragRoutes', figures?.crag_routes_count, { count: figures?.crag_routes_count?.toLocaleString() ?? '...' }) }}
        </v-card-subtitle>
      </div>
      <v-img
        class="ml-auto"
        src="/svg/outdoor-drawing-icon.svg"
        max-height="70"
        max-width="70"
        contain
      />
      <v-btn
        icon
        color="primary"
        class="mr-2 ml-4"
      >
        <v-icon>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </v-card>
    <v-card class="d-flex align-center mb-1 py-0" to="/indoor">
      <div>
        <v-card-title>
          <v-icon color="primary" left>
            {{ oblykIndoor }}
          </v-icon>
          Indoor
        </v-card-title>
        <v-card-subtitle class="caption">
          {{ $tc('common.figures.gyms', figures?.gyms_count, { count: figures?.gyms_count?.toLocaleString() ?? '...' }) }} ·
          {{ $tc('common.figures.gymGuideBooks', figures?.gym_active_guides_count, { count: figures?.gym_active_guides_count?.toLocaleString() ?? '...' }) }}
        </v-card-subtitle>
      </div>
      <v-img
        class="ml-auto"
        src="/svg/indoor-drawing-icon.svg"
        max-height="70"
        max-width="70"
        contain
      />
      <v-btn
        icon
        color="primary"
        class="mr-2 ml-4"
      >
        <v-icon>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </v-card>
    <v-card class="d-flex align-center py-0" to="/community">
      <div>
        <v-card-title>
          <v-icon color="primary" left>
            {{ oblykPartner }}
          </v-icon>
          {{ $t('common.community') }}
        </v-card-title>
        <v-card-subtitle class="caption">
          {{ $tc('common.figures.climbers', figures?.climbers_count, { count: figures?.climbers_count?.toLocaleString() ?? '...' }) }}
        </v-card-subtitle>
      </div>
      <v-img
        class="ml-auto"
        src="/svg/community-drawing-icon.svg"
        max-height="70"
        max-width="70"
        contain
      />
      <v-btn
        icon
        color="primary"
        class="mr-2 ml-4"
      >
        <v-icon>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </v-card>
  </div>
</template>
<script>

import { mdiViewDashboard, mdiTerrain, mdiArrowRight } from '@mdi/js'
import { oblykIndoor, oblykPartner } from '~/assets/oblyk-icons'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'UserEnvironmentCard',

  data () {
    return {
      loading: true,
      figures: null,

      mdiViewDashboard,
      mdiTerrain,
      mdiArrowRight,
      oblykIndoor,
      oblykPartner
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      this.loading = true
      new OblykApi(this.$axios, this.$auth)
        .get(
          '/micro_stats',
          {
            figures: {
              climbers_count: true,
              gyms_count: true,
              gym_active_guides_count: true,
              crags_count: true,
              crag_routes_count: true
            }
          }
        )
        .then((resp) => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
