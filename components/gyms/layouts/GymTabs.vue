<template>
  <v-tabs
    class="mb-5 rounded rounded-t-0"
    show-arrows
  >
    <v-tab :to="gym.path">
      {{ $t('components.gym.tabs.info') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length > 0"
      :to="spacesPath"
    >
      <v-btn
        elevation="0"
        color="primary"
        class="white--text"
      >
        {{ $t('components.gym.tabs.guideBook') }}
      </v-btn>
    </v-tab>

    <client-only>
      <v-tab
        v-if="currentUserIsGymAdmin()"
        :to="gym.adminPath"
      >
        {{ $t('components.gym.tabs.admin') }}
      </v-tab>
    </client-only>
  </v-tabs>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GymTabs',
  mixins: [SessionConcern],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  computed: {
    spacesPath () {
      if (this.gym.gym_spaces.length === 0) {
        return `${this.gym.adminPath}/first-space`
      } else if (this.gym.gym_spaces.length === 1) {
        return this.gym.firstSpacePath
      } else {
        return `${this.gym.path}/spaces`
      }
    }
  }
}
</script>
