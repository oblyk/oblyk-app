<template>
  <v-card
    :to="`${gym.amindPath}/routes/tables`"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        {{ mdiSourceBranch }}
      </v-icon>
      {{ $t('components.gymAdmin.routes') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ routesCount }}
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiSourceBranch } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'GymAdminRouteFigures',
  props: {
    gym: Object
  },

  data () {
    return {
      mdiSourceBranch,
      routesCount: 0
    }
  },

  mounted () {
    this.getRoutesCount()
  },

  methods: {
    getRoutesCount () {
      new GymApi(this.$axios, this.$auth)
        .routesCount(this.gym.id)
        .then((resp) => {
          this.routesCount = resp.data
        })
    }
  }
}
</script>
