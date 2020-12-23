import GymSpace from '@/models/GymSpace'

export const GymSpaceConcern = {
  data () {
    return {
      gymSpace: null,
      loadingGymSpace: true
    }
  },

  created () {
    if (this.$route.params.gymId && this.$route.params.gymSpaceId) this.getGymSpace()
  },

  methods: {
    getGymSpace: function () {
      this.loadingGymSpace = true
      new GymSpace()
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId
        )
        .then((resp) => {
          this.gymSpace = resp
        })
        .catch((err) => {
          console.error(err)
        }).finally(() => {
          this.loadingGymSpace = false
        })
    }
  }
}
