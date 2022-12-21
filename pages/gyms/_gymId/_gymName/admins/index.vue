<template>
  <v-container fluid>
    <!-- Gym admin loader -->
    <div v-if="!gym">
      <v-breadcrumbs
        :items="[{ text: '...' }, { text: '...' }]"
        class="mb-1"
      />
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="article" />
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="card-heading" />
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="card-heading" />
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="card-heading" />
        </v-col>
      </v-row>
    </div>

    <!-- Gym admin -->
    <div v-if="gym">
      <v-breadcrumbs
        :items="breadcrumbs"
        class="mb-1"
      />
      <v-row>
        <v-col class="col-md-12 pa-2">
          <gym-admin-welcome :gym="gym" />
        </v-col>
      </v-row>

      <!-- Guide book settings -->
      <v-row>
        <div class="col-sm-12 mt-10">
          <p class="subtitle-1 mb-0">
            <v-icon left>
              {{ mdiMapLegend }}
            </v-icon>
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
            <v-icon left>
              {{ mdiTune }}
            </v-icon>
            {{ $t('components.gymAdmin.gestionSettings') }}
          </p>
        </div>
      </v-row>
      <v-row>
        <div class="col-sm-12 col-md-6 col-lg-4 pa-2">
          <gym-admin-team-figures :gym="gym" />
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mdiMapLegend, mdiTune } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import GymAdminDifficultySystemFigures from '~/components/gyms/admin/GymAdminDifficultySystemFigures'
import GymAdminTeamFigures from '~/components/gyms/admin/GymAdminTeamFigures'
import GymAdminWelcome from '~/components/gyms/admin/GymAdminWelcome'
import GymAdminSpaceFigures from '~/components/gyms/admin/GymAdminSpaceFigures'
import GymAdminRouteFigures from '~/components/gyms/admin/GymAdminRouteFigures'

export default {
  meta: { orphanRoute: true },
  components: {
    GymAdminRouteFigures,
    GymAdminSpaceFigures,
    GymAdminWelcome,
    GymAdminTeamFigures,
    GymAdminDifficultySystemFigures
  },

  mixins: [GymConcern],

  data () {
    return {
      mdiMapLegend,
      mdiTune
    }
  },

  head () {
    return {
      title: this.$t('meta.gym.admin', { name: (this.gym || {}).name })
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: this.gym?.adminPath,
          exact: true
        }
      ]
    }
  }
}
</script>
