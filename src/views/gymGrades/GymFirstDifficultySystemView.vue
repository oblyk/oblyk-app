<template>
  <div>
    <v-container class="global-form-width">
      <spinner v-if="loadingGym" />

      <v-row v-if="!loadingGym">
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
  </div>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GymFirstSpaceView',
  components: { Spinner },
  mixins: [GymConcern]
}
</script>
