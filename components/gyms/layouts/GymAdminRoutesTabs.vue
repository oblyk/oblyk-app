<template>
  <v-tabs show-arrows>
    <v-tab :to="gym.adminPath">
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-tab>
    <v-tab to="tables">
      {{ $t('components.gym.tabs.tables') }}
    </v-tab>

    <v-tab to="statistics">
      {{ $t('components.gym.tabs.statistics') }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'

export default {
  name: 'GymAdminRoutesTabs',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiArrowLeft
    }
  }
}
</script>
