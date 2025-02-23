<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ mdiFileDocument }}
      </v-icon>
      {{ $t('components.gymAdmin.subscriptions') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <v-chip
        outlined
        :to="`${gym.adminPath}/indoor-subscriptions`"
      >
        <v-icon
          left
          color="deep-purple accent-4"
        >
          {{ icons[gym.plan] }}
        </v-icon>
        <strong>
          {{ $t(`models.gym.plan_list.${gym.plan}`) }}
        </strong>
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        outlined
        :to="`${gym.adminPath}/indoor-subscriptions`"
      >
        {{ $t('components.gymAdmin.subscriptions') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  mdiFileDocument,
  mdiCreation,
  mdiArrowUpBoldHexagonOutline,
  mdiCurrencyEurOff
} from '@mdi/js'

export default {
  name: 'GymSubscriptionsFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},
      icons: {
        free: mdiCurrencyEurOff,
        free_trial: mdiArrowUpBoldHexagonOutline,
        full_package: mdiCreation
      },

      mdiFileDocument
    }
  }
}
</script>
