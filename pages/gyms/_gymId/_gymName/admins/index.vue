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
      <v-btn
        text
        outlined
        href="https://oblyk.github.io/app-user-doc/docs/indoor/"
        target="_blank"
      >
        <v-icon left>
          {{ mdiHelpCircleOutline }}
        </v-icon>
        {{ $t('common.documentation') }}
      </v-btn>
      <v-btn
        text
        outlined
        @click="bugModal = true"
      >
        <v-icon left>
          {{ mdiBug }}
        </v-icon>
        {{ $t('common.bugSuggestion') }}
      </v-btn>
      <v-btn
        text
        outlined
        href="https://github.com/orgs/oblyk/projects/6"
        target="_blank"
      >
        <v-icon left>
          {{ mdiChartTimeline }}
        </v-icon>
        Roadmap
      </v-btn>
    </div>

    <v-dialog
      v-model="bugModal"
      width="700"
    >
      <v-card>
        <v-card-title>
          <v-icon left>
            {{ mdiBug }}
          </v-icon>
          {{ $t('common.bugSuggestion') }}
        </v-card-title>
        <v-card-text>
          <p>
            Oblyk étant open-source nous partageons les retours de bug et suggestions publiquement sur la platform Github sur laquelle vous pouvez aussi consulter le code, la roadmap, les développements encours, etc.
          </p>
          <p>
            Vous pouvez chercher les suggestions et bug déja remonté par la communauté en tapant des mots clés dans la bar de recherche sur la capture ci-dessous :
          </p>
          <a href="https://github.com/oblyk/oblyk-app/issues" target="_blank">
            <v-img
              class="elevation-5 rounded mb-4"
              src="/images/github-report-bug.jpg"
            />
          </a>
          <p class="mb-0">
            Si vous ne trouvez pas votre bug ou votre suggestion, vous pouvez créer un nouveau ticket en cliquant sur [New Issue]
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            elevation="0"
            color="primary"
            class="ml-auto"
            target="_blank"
            href="https://github.com/oblyk/oblyk-app/issues"
          >
            Reporter un bug, faire une suggestion
            <v-icon left>
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  mdiMapLegend,
  mdiTune,
  mdiFolder,
  mdiHelpCircleOutline,
  mdiCog,
  mdiAccountMultiple,
  mdiBug,
  mdiChartTimeline,
  mdiArrowRight
} from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import GymAdminTeamFigures from '~/components/gyms/admin/GymAdminTeamFigures'
import GymAdminWelcome from '~/components/gyms/admin/GymAdminWelcome'
import GymAdminSpaceFigures from '~/components/gyms/admin/GymAdminSpaceFigures'
import GymAdminRouteFigures from '~/components/gyms/admin/GymAdminRouteFigures'
import GymAdminOpenersFigures from '~/components/gyms/admin/GymAdminOpenersFigures.vue'
import GymAdminInteractiveGuideParameters from '~/components/gyms/admin/GymAdminInteractiveGuideParameters.vue'
import GymAdminContestsFigures from '~/components/gyms/admin/GymAdminContestFigures.vue'
import GymAdminCommentAndVideoFigures from '~/components/gyms/admin/GymAdminCommentAndVideoFigures.vue'
import GymSubscriptionsFigures from '~/components/gyms/admin/GymSubscriptionsFigures.vue'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  meta: { orphanRoute: true },
  components: {
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
      mdiHelpCircleOutline,
      mdiCog,
      mdiAccountMultiple,
      mdiBug,
      mdiChartTimeline,
      mdiArrowRight
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
