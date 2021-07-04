<template>
  <v-card
    :to="gym.path('admin/routes/tables')"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        mdi-source-branch
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
import GymApi from '@/services/oblyk-api/GymApi'

export default {
  name: 'GymAdminRouteFigures',
  props: {
    gym: Object
  },

  data () {
    return {
      routesCount: 0
    }
  },

  mounted () {
    this.getRoutesCount()
  },

  methods: {
    getRoutesCount: function () {
      GymApi
        .routesCount(this.gym.id)
        .then((resp) => {
          this.routesCount = resp.data
        })
    }
  }
}
</script>
