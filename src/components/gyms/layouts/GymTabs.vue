<template>
  <v-tabs show-arrows >
    <v-tab to="infos">
      {{ $t('components.gym.tabs.info') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length === 0"
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

    <v-tab v-if="currentUserIsGymAdmin()" to="admin">
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
