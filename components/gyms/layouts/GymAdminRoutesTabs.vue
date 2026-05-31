<template>
  <v-tabs show-arrows class="rounded">
    <v-tab :to="gym.adminPath">
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-tab>
    <v-tab to="tables">
      {{ $t('components.gym.tabs.tables') }}
    </v-tab>

    <v-tab to="statistics">
      {{ $t('components.gym.tabs.statistics') }}
      <v-icon
        v-if="gym.plan !== 'full_package'"
        right
        color="deep-purple accent-4"
      >
        {{ mdiArrowUpBoldHexagonOutline }}
      </v-icon>
    </v-tab>

    <v-tab to="cross-statistics">
      {{ $t('components.gym.tabs.crossStatistics') }}
      <v-chip small color="blue darken-2" dark class="px-2 ml-1 font-weight-bold">
        new
      </v-chip>
      <v-icon
        v-if="gym.plan !== 'full_package'"
        right
        color="deep-purple accent-4"
      >
        {{ mdiArrowUpBoldHexagonOutline }}
      </v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
import { mdiArrowLeft, mdiArrowUpBoldHexagonOutline } from '@mdi/js'

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
      mdiArrowLeft,
      mdiArrowUpBoldHexagonOutline
    }
  }
}
</script>
