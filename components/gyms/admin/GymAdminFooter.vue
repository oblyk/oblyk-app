<template>
  <v-row>
    <!-- DOCUMENTATION -->
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <p class="font-weight-bold mb-1">
          <v-icon
            left
            small
            class="mb-1"
          >
            {{ mdiFileQuestion }}
          </v-icon>
          {{ $t('common.documentation') }}
        </p>
        <p class="subtitle-2 font-weight-regular">
          {{ $t('components.gymAdminFooter.documentation.body') }}
        </p>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            href="https://oblyk.github.io/app-user-doc/docs/indoor/"
          >
            {{ $t('common.documentation') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>

    <!-- INTEGRATION  -->
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <p class="font-weight-bold mb-1">
          <v-icon
            left
            small
            class="mb-1"
          >
            {{ mdiRemoteDesktop }}
          </v-icon>
          {{ $t('components.gymAdminFooter.integration.title') }}
          <v-chip
            x-small
            dark
            color="blue"
            class="px-2"
          >
            NEW!
          </v-chip>
        </p>
        <p class="subtitle-2 font-weight-regular">
          {{ $t('components.gymAdminFooter.integration.body') }}
        </p>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            :href="`https://embedded.oblyk.org/gyms/${gym.id}/${gym.slug_name}/integration-helper`"
          >
            {{ $t('actions.integrate') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>

    <!-- SUGGESTION  -->
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <p class="font-weight-bold mb-1">
          <v-icon
            left
            small
            class="mb-1"
          >
            {{ mdiBug }}
          </v-icon>
          {{ $t('components.gymAdminFooter.suggestion.title') }}
        </p>
        <p>
          {{ $t('components.gymAdminFooter.suggestion.body') }}
        </p>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            @click="bugModal = true"
          >
            {{ $t('actions.suggest') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>
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

    <!-- ROADMAP -->
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <p class="font-weight-bold mb-1">
          <v-icon
            left
            small
            class="mb-1"
          >
            {{ mdiChartTimeline }}
          </v-icon>
          {{ $t('components.gymAdminFooter.roadmap.title') }}
        </p>
        <p>
          {{ $t('components.gymAdminFooter.roadmap.body') }}
        </p>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            href="https://github.com/orgs/oblyk/projects/6"
          >
            {{ $t('components.gymAdminFooter.roadmap.title') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiFileQuestion,
  mdiRemoteDesktop,
  mdiBug,
  mdiArrowRight,
  mdiChartTimeline
} from '@mdi/js'

export default {
  name: 'GymAdminFooter',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      bugModal: false,

      mdiFileQuestion,
      mdiRemoteDesktop,
      mdiBug,
      mdiArrowRight,
      mdiChartTimeline
    }
  }
}
</script>
