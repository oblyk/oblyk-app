<template>
  <v-container
    v-if="gym"
    class="global-form-width"
  >
    <v-row>
      <v-col>
        <p class="text-center mb-7">
          <v-icon x-large>
            mdi-tag-multiple
          </v-icon>
        </p>
        <p class="heading text-center">
          {{ $t('components.gym.firstDifficultySystemExplain') }}
        </p>
        <p class="heading text-center">
          {{ $t('components.gym.firstDifficultySystemExplainTow') }}
        </p>
        <p class="text-center mt-10">
          <v-btn
            color="primary"
            :to="gym.path('grades/new')"
          >
            {{ $t('components.gym.createDifficultySystemSpace') }}
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '@/concerns/GymConcern'

export default {
  name: 'GymFirstSpaceView',
  mixins: [GymConcern]
}
</script>
