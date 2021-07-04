<template>
  <v-container fluid v-if="gym">
    <v-row>
      <v-col class="col-md-12 pa-2">
        <gym-admin-welcome :gym="gym" />
      </v-col>
    </v-row>

    <!-- Guide book settings -->
    <v-row>
      <div class="col-sm-12 mt-10">
        <p class="subtitle-1 mb-0">
          <v-icon left>mdi-map-legend</v-icon>
          {{ $t('components.gymAdmin.GuideBookSettings') }}
        </p>
      </div>
    </v-row>
    <v-row>
      <div class="col-sm-12 col-md-6 col-lg-4 pa-2">
        <gym-admin-route-figures :gym="gym" />
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 pa-2">
        <gym-admin-space-figures :gym="gym" />
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 pa-2">
        <gym-admin-difficulty-system-figures :gym="gym" />
      </div>
    </v-row>

    <!-- Gestion settings -->
    <v-row>
      <div class="col-sm-12 mt-10">
        <p class="subtitle-1 mb-0">
          <v-icon left>mdi-tune</v-icon>
          {{ $t('components.gymAdmin.gestionSettings') }}
        </p>
      </div>
    </v-row>
    <v-row>
      <div class="col-sm-12 col-md-6 col-lg-4 pa-2">
        <gym-admin-team-figures :gym="gym" />
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '@/concerns/GymConcern'
import GymAdminDifficultySystemFigures from '@/components/gyms/admin/GymAdminDifficultySystemFigures'
import GymAdminTeamFigures from '@/components/gyms/admin/GymAdminTeamFigures'
import GymAdminWelcome from '@/components/gyms/admin/GymAdminWelcome'
import GymAdminSpaceFigures from '@/components/gyms/admin/GymAdminSpaceFigures'
import GymAdminRouteFigures from '@/components/gyms/admin/GymAdminRouteFigures'

export default {
  name: 'GymAdminView',
  mixins: [GymConcern],

  components: {
    GymAdminRouteFigures,
    GymAdminSpaceFigures,
    GymAdminWelcome,
    GymAdminTeamFigures,
    GymAdminDifficultySystemFigures
  },

  metaInfo () {
    return {
      title: this.$t('meta.gym.admin', { name: (this.gym || {}).name })
    }
  }
}
</script>
