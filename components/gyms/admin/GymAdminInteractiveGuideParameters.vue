<template>
  <v-card class="full-height">
    <v-card-title class="pb-2">
      <v-icon left>
        {{ mdiWrench }}
      </v-icon>
      {{ $t('components.gymAdmin.parameters') }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-sheet class="rounded back-app-color px-3 pt-2 pb-1">
            <p class="font-weight-bold mb-1">
              {{ $t('components.gymAdmin.difficultySystem') }}
            </p>
            <p class="mb-0">
              {{ $t('components.gymAdmin.difficultySystemExplain') }}
            </p>
            <div class="text-center">
              <v-btn
                text
                color="primary"
                :to="gym.gym_grades_count > 0 ? `${gym.adminPath}/grades` : `${gym.adminPath}/first-difficulty-system`"
              >
                {{ $t('components.gymAdmin.difficultySystemShort') }}
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="rounded back-app-color px-3 pt-2 pb-1">
            <p class="font-weight-bold mb-1">
              {{ $t('components.gymAdmin.climbingStyle') }}
            </p>
            <p class="mb-0">
              {{ $t('components.gymAdmin.climbingStyleExplain') }}
            </p>
            <div class="text-center">
              <v-btn
                text
                color="primary"
                :to="`${gym.adminPath}/climbing-styles`"
              >
                {{ $t('components.gymAdmin.styles') }}
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiWrench } from '@mdi/js'

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
      mdiWrench
    }
  }
}
</script>
