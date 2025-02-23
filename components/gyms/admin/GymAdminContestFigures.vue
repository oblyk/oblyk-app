<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ mdiTrophy }}
      </v-icon>
      {{ $t('components.gymAdmin.contests') }} & {{ $t('components.gymAdmin.championships') }}
      <indoor-subscription-up-btn
        v-if="gym.plan !== 'full_package'"
        :gym="gym"
      />
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7 d-flex justify-space-around">
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.contests_count !== null ? figures.contests_count : '...' }}
        </p>
        <small>
          {{ $t('components.gymAdmin.contests') }}
        </small>
      </div>
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.championships_count !== null ? figures.championships_count : '...' }}
        </p>
        <small>
          {{ $t('components.gymAdmin.championships') }}
        </small>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        elevation="0"
        text
        outlined
        :to="`${gym.adminPath}/championships`"
      >
        {{ $t('components.gymAdmin.championships') }}
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        :to="`${gym.adminPath}/contests`"
      >
        {{ $t('components.gymAdmin.contests') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiTrophy } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'
import IndoorSubscriptionUpBtn from '~/components/indoorSubscription/IndoorSubscriptionUpBtn.vue'

export default {
  name: 'GymAdminContestsFigures',
  components: { IndoorSubscriptionUpBtn },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},

      mdiTrophy
    }
  },

  created () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['contests_count', 'championships_count'])
        .then((resp) => { this.figures = resp.data })
    }
  }
}
</script>
