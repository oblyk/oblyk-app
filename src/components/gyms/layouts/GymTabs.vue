<template>
  <v-tabs show-arrows >
    <v-tab :to="gym.path()">
      {{ $t('components.gym.tabs.info') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length === 0"
      :to="gym.path('first-space')"
    >
      {{ $t('components.gym.tabs.guideBook') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length > 0"
      :to="gym.firstSpacePath()"
    >
      <v-badge
        color="primary"
        inline
        :value="gym.gym_spaces.length > 0"
        :content="gym.gym_spaces.length"
      >
        {{ $t('components.gym.tabs.guideBook') }}
      </v-badge>
    </v-tab>

    <v-tab
      v-if="currentUserIsGymAdmin()"
      :to="gym.path('admin')"
    >
      {{ $t('components.gym.tabs.admin') }}
    </v-tab>
  </v-tabs>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GymTabs',
  mixins: [SessionConcern],
  props: {
    gym: Object
  }
}
</script>
