<template>
  <v-tabs
    class="mb-5 rounded rounded-t-0"
    show-arrows
  >
    <v-tab :to="gym.path">
      {{ $t('components.gym.tabs.info') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length === 0"
      :to="`${gym.adminPath}/first-space`"
    >
      {{ $t('components.gym.tabs.guideBook') }}
    </v-tab>

    <v-tab
      v-if="gym.gym_spaces.length > 0"
      :to="gym.firstSpacePath"
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

    <client-only>
      <v-tab
        v-if="currentUserIsGymAdmin()"
        :to="`${gym.path}/admin`"
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
  }
}
</script>
