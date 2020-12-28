<template>
  <v-tabs show-arrows >
    <v-tab to="infos">
      {{ $t('components.gym.tabs.info') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length == 0"
      to="first-space"
    >
      {{ $t('components.gym.tabs.guideBook') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length > 0"
      :to="gym.firstSpaceUrl()"
    >
      <v-badge
        color="primary"
        inline
        :content="gym.gym_spaces.length"
      >
        {{ $t('components.gym.tabs.guideBook') }}
      </v-badge>
    </v-tab>

    <v-tab
      v-if="gym.gym_grades_count > 0"
      :to="'grades-list'"
    >
      <v-badge
        color="primary"
        inline
        :content="gym.gym_grades_count"
      >
        {{ $t('components.gym.tabs.difficultySystem') }}
      </v-badge>
    </v-tab>
  </v-tabs>
</template>
<script>
import { Sessionable } from '@/concerns/Sessionable'

export default {
  name: 'GymTabs',
  mixins: [Sessionable],
  props: {
    gym: Object
  }
}
</script>
