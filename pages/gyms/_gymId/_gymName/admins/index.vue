<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />

    <div v-else>
      <gym-page-header :gym="gym" />

      <!-- Gym admin -->
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="pa-2">
            <gym-admin-welcome :gym="gym" />
          </v-col>
        </v-row>

        <v-breadcrumbs :items="breadcrumbs" />

        <!-- Main function -->
        <h4 class="mb-3 mt-8">
          <v-icon class="mb-1" left>
            {{ mdiMapLegend }}
          </v-icon>
          {{ $t('components.gymAdmin.GuideBookAndContest') }}
        </h4>
        <v-row>
          <v-col cols="12" md="6" lg="4" class="pa-2">
            <gym-admin-route-figures :gym="gym" />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="pa-2">
            <gym-admin-space-figures :gym="gym" />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="pa-2">
            <gym-admin-contests-figures :gym="gym" />
          </v-col>
        </v-row>

        <!-- Community -->
        <h4 class="mb-3 mt-8">
          <v-icon class="mb-1" left>
            {{ mdiAccountMultiple }}
          </v-icon>
          {{ $t('components.gymAdmin.myCommunity') }}
        </h4>
        <v-row>
          <v-col cols="12" md="6" lg="4" class="pa-2">
            <gym-admin-comment-and-video-figures :gym="gym" />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="pa-2">
            <gym-admin-publications-figures :gym="gym" />
          </v-col>
        </v-row>

        <!-- Guide book settings -->
        <h4 class="mb-3 mt-8">
          <v-icon class="mb-1" left>
            {{ mdiCog }}
          </v-icon>
          {{ $t('components.gymAdmin.GuideBookSettings') }}
        </h4>
        <gym-admin-interactive-guide-parameters :gym="gym" />

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
          <v-col
            v-if="gymAuthCan(gym, 'manage_subscription')"
            cols="12"
            md="6"
            lg="4"
            class="pa-2"
          >
            <gym-subscriptions-figures :gym="gym" />
          </v-col>
        </v-row>

        <h4 class="mb-1 mt-8">
          <v-icon class="mb-1" left>
            {{ mdiFolder }}
          </v-icon>
          {{ $t('components.gymAdmin.various') }}
        </h4>
        <gym-admin-footer :gym="gym" />
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  mdiMapLegend,
  mdiTune,
  mdiFolder,
  mdiCog,
  mdiAccountMultiple
} from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymAdminTeamFigures from '~/components/gyms/admin/GymAdminTeamFigures'
import GymAdminWelcome from '~/components/gyms/admin/GymAdminWelcome'
import GymAdminSpaceFigures from '~/components/gyms/admin/GymAdminSpaceFigures'
import GymAdminRouteFigures from '~/components/gyms/admin/GymAdminRouteFigures'
import GymAdminOpenersFigures from '~/components/gyms/admin/GymAdminOpenersFigures'
import GymAdminInteractiveGuideParameters from '~/components/gyms/admin/GymAdminInteractiveGuideParameters'
import GymAdminContestsFigures from '~/components/gyms/admin/GymAdminContestFigures'
import GymAdminCommentAndVideoFigures from '~/components/gyms/admin/GymAdminCommentAndVideoFigures'
import GymSubscriptionsFigures from '~/components/gyms/admin/GymSubscriptionsFigures'
import GymAdminPublicationsFigures from '~/components/gyms/admin/GymAdminPublicationFigures'
import GymPageHeader from '~/components/gyms/layouts/GymPageHeader'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import GymAdminFooter from '~/components/gyms/admin/GymAdminFooter'

export default {
  meta: { orphanRoute: true },
  components: {
    GymAdminFooter,
    SkeletonLoaderPageHead,
    GymPageHeader,
    GymAdminPublicationsFigures,
    GymSubscriptionsFigures,
    GymAdminCommentAndVideoFigures,
    GymAdminContestsFigures,
    GymAdminInteractiveGuideParameters,
    GymAdminOpenersFigures,
    GymAdminRouteFigures,
    GymAdminSpaceFigures,
    GymAdminWelcome,
    GymAdminTeamFigures
  },

  mixins: [GymConcern, GymRolesHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      bugModal: false,

      mdiMapLegend,
      mdiTune,
      mdiFolder,
      mdiCog,
      mdiAccountMultiple
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
