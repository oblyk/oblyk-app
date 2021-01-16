<template>
  <v-container
    class="global-form-width"
    v-if="gym"
  >
    <v-row>
      <v-col v-if="currentUserIsGymAdmin()">
        <p class="text-center mb-7">
          <v-icon x-large>
            mdi-map-legend
          </v-icon>
        </p>
        <p class="text-center">
          {{ $t('components.gym.firstSpaceExplain') }}
        </p>

        <div v-if="gym.gym_grades_count === 0">
          <p class="text-center">
            {{ $t('components.gym.createDifficultyFirst') }}
          </p>

          <p class="text-center">
            <v-btn
              text
              color="primary"
              :to="gym.path('first-difficulty-system')"
            >
              {{ $t('components.gym.difficultySystem') }}
            </v-btn>
          </p>
        </div>
        <p v-if="gym.gym_grades_count > 0" class="text-center mt-10">
          <v-btn
            color="primary"
            :to="gym.path('spaces/new')"
          >
            {{ $t('components.gym.createFirstSpace') }}
          </v-btn>
        </p>
      </v-col>

      <v-col v-else>
        <p class="text--disabled text-center">
          {{ $t('components.gym.administratorRequired') }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GymFirstSpaceView',
  mixins: [SessionConcern],
  props: {
    gym: Object
  },

  methods: {
    userCanTouch: function () {
      return this.isLoggedIn && (!this.gym.administered || this.currentUserIsGymAdmin())
    }
  }
}
</script>
