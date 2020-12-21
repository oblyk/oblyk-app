import GymSpaceApi from '@/services/oblyk-api/gymSpace'
import GymSpaceModel from '@/models/GymSpaceModel'

export const GymSpaceable = {
  data () {
    return {
      gymSpace: null,
      loadingGymSpace: true
    }
  },

  created () {
    if (this.$route.params.gymId && this.$route.params.gymSpaceId) this.getGym()
  },

  methods: {
    getGym: function () {
      this.loadingGymSpace = true
      GymSpaceApi
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId
        )
        .then(resp => {
          this.gymSpace = new GymSpaceModel(resp.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.loadingGymSpace = false
        })
    }
  }
}
