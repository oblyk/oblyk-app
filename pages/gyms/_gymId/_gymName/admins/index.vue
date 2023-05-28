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
    <div
      v-if="gym"
      class="mb-5"
    >
      <v-row>
        <v-col cols="12" class="pa-2">
          <gym-admin-welcome :gym="gym" />
        </v-col>
      </v-row>

      <v-breadcrumbs :items="breadcrumbs" />

      <!-- Guide book settings -->
      <h4 class="mb-3 mt-8">
        <v-icon class="mb-1" left>
          {{ mdiMapLegend }}
        </v-icon>
        {{ $t('components.gymAdmin.GuideBookSettings') }}
      </h4>
      <v-row>
        <v-col cols="12" md="6" lg="4" class="pa-2">
          <gym-admin-route-figures :gym="gym" />
        </v-col>
        <v-col cols="12" md="6" lg="4" class="pa-2">
          <gym-admin-space-figures :gym="gym" />
        </v-col>
        <v-col cols="12" md="6" lg="4" class="pa-2">
          <gym-admin-interactive-guide-parameters :gym="gym" />
        </v-col>
      </v-row>

      <!-- Gestion settings -->
      <h4 class="mb-3 mt-8">
        <v-icon class="mb-1" left>
          {{ mdiTune }}
        </v-icon>
        {{ $t('components.gymAdmin.gestionSettings') }}
      </h4>
      <v-row>
        <v-col cols="12" md="6" lg="4" class="pa-2">
          <gym-admin-team-figures :gym="gym" />
        </v-col>
        <v-col cols="12" md="6" lg="4" class="pa-2">
          <gym-admin-openers-figures :gym="gym" />
        </v-col>
      </v-row>

      <h4 class="mb-1 mt-8">
        <v-icon class="mb-1" left>
          {{ mdiFolder }}
        </v-icon>
        {{ $t('components.gymAdmin.various') }}
      </h4>
      <v-btn
        text
        color="primary"
        href="https://oblyk.github.io/app-user-doc/docs/indoor/"
        target="_blank"
      >
        <v-icon left>
          {{ mdiHelpCircleOutline }}
        </v-icon>
        {{ $t('common.documentation') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mdiMapLegend, mdiTune, mdiFolder, mdiHelpCircleOutline } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import GymAdminTeamFigures from '~/components/gyms/admin/GymAdminTeamFigures'
import GymAdminWelcome from '~/components/gyms/admin/GymAdminWelcome'
import GymAdminSpaceFigures from '~/components/gyms/admin/GymAdminSpaceFigures'
import GymAdminRouteFigures from '~/components/gyms/admin/GymAdminRouteFigures'
import GymAdminOpenersFigures from '~/components/gyms/admin/GymAdminOpenersFigures.vue'
import GymAdminInteractiveGuideParameters from '~/components/gyms/admin/GymAdminInteractiveGuideParameters.vue'

export default {
  meta: { orphanRoute: true },
  components: {
    GymAdminInteractiveGuideParameters,
    GymAdminOpenersFigures,
    GymAdminRouteFigures,
    GymAdminSpaceFigures,
    GymAdminWelcome,
    GymAdminTeamFigures
  },

  mixins: [GymConcern],

  data () {
    return {
      mdiMapLegend,
      mdiTune,
      mdiFolder,
      mdiHelpCircleOutline
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} - Dashboard'
      },
      en: {
        metaTitle: '%{name} - Dashboard'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gym?.name })
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
