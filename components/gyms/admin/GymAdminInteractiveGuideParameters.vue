<template>
  <v-row>
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <div class="back-app-color pa-2 mb-2 rounded-sm">
          <p class="font-weight-bold mb-1">
            <v-icon
              left
              small
              class="mb-1"
            >
              {{ mdiFormatListBulletedSquare }}
            </v-icon>
            {{ $t('components.gymAdmin.difficultySystem') }}
          </p>
          <p class="mb-2">
            {{ $t('components.gymAdmin.difficultySystemExplain') }}
          </p>
        </div>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            :to="gym.gym_grades_count > 0 ? `${gym.adminPath}/grades` : `${gym.adminPath}/first-difficulty-system`"
          >
            {{ $t('components.gymAdmin.difficultySystemShort') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <div class="back-app-color pa-2 mb-2 rounded-sm">
          <p class="font-weight-bold mb-1">
            <v-icon
              left
              small
              class="mb-1"
            >
              {{ mdiHumanGreeting }}
            </v-icon>
            {{ $t('components.gymAdmin.climbingStyle') }}
          </p>
          <p class="mb-2">
            {{ $t('components.gymAdmin.climbingStyleExplain') }}
          </p>
        </div>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            :to="`${gym.adminPath}/climbing-styles`"
          >
            {{ $t('components.gymAdmin.styles') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="rounded px-3 pt-3 pb-2 full-height d-flex flex-column">
        <div class="back-app-color pa-2 mb-2 rounded-sm">
          <p class="font-weight-bold mb-1">
            <v-icon
              left
              small
              class="mb-1"
            >
              {{ mdiFileDocumentOutline }}
            </v-icon>
            {{ $t('components.gymAdmin.labelTemplate') }}
          </p>
          <p class="mb-2">
            {{ $t('components.gymAdmin.labelTemplateExplain') }}
          </p>
        </div>
        <div class="text-right mt-auto">
          <v-btn
            text
            outlined
            :to="`${gym.adminPath}/label-templates`"
          >
            {{ $t('components.gymAdmin.labelTemplate') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mdiFormatListBulletedSquare, mdiFileDocumentOutline, mdiHumanGreeting } from '@mdi/js'

export default {
  name: 'GymAdminInteractiveGuideParameters',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiFormatListBulletedSquare,
      mdiFileDocumentOutline,
      mdiHumanGreeting
    }
  }
}
</script>
