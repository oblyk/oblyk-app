<template>
  <div>
    <spinner v-if="loadingGym"></spinner>

    <v-container v-if="!loadingGym">
      <v-row>
        <v-col class="col-md-12 pa-2">
          <gym-welcome-card :gym="gym" />
        </v-col>
      </v-row>

      <!-- Guide book settings -->
      <v-row>
        <v-col class="mt-10">
          <p class="subtitle-1 mb-0">
            <v-icon left>mdi-map-legend</v-icon>
            {{ $t('components.gymAdmin.GuideBookSettings') }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-sm-12 col-md-6 col-lg-3 pa-2">
          <difficulty-system-card :gym="gym" />
        </v-col>
      </v-row>

      <!-- Gestion settings -->
      <v-row>
        <v-col class="mt-10">
          <p class="subtitle-1 mb-0">
            <v-icon left>mdi-tune</v-icon>
            {{ $t('components.gymAdmin.gestionSettings') }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-sm-12 col-md-6 col-lg-3 pa-2">
          <gym-team-card :gym="gym" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import Spinner from '@/components/layouts/Spiner'
import DifficultySystemCard from '@/components/gyms/admin/DifficultySystemCard'
import GymTeamCard from '@/components/gyms/admin/GymTeamCard'
import GymWelcomeCard from '@/components/gyms/admin/GymWelcomeCard'

export default {
  name: 'GymAdminView',
  components: {
    GymWelcomeCard,
    GymTeamCard,
    DifficultySystemCard,
    Spinner
  },
  mixins: [GymConcern]
}
</script>
