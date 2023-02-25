<template>
  <v-container class="common-page-container">
    <p class="text--disabled my-15 text-center">
      {{ $t('common.loading') }}
    </p>
  </v-container>
</template>

<script>
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'

export default {
  mounted () {
    this.getRoute()
  },

  methods: {
    getRoute () {
      const params = this.$route.params.gymAndRouteId.split('-')
      const gymId = params[0]
      const gymRouteId = params[1]
      new GymRouteApi(this.$axios, this.$auth)
        .find(gymId, null, gymRouteId)
        .then((resp) => {
          const gymRoute = new GymRoute({ attributes: resp.data })
          this.$router.push(gymRoute.pathInSpace)
        })
    }
  }
}
</script>
